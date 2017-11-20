max_length = 250;
didScroll = false;
device_type = 0;
x_scroll = 0;
do_extend = false;
show_hint = false;//show hints or not? No matter if there's a suggestion.

updateView(cleanUp);

if (document.addEventListener){
	//window.addEventListener("scroll", fixedNavbar);
	//document.addEventListener("mousemove", function(event){rotate(event)});
	window.addEventListener("resize", function(){
		updateView(cleanUp);
	});
	document.addEventListener("click", function(event){
		//not clicking on the search input field
		console.log(event.target.closest("#qr_div"));
		console.log(event.target.closest("#wechat_div"));
		if (event.target.closest("#navbarSearcher") === null) {
			cleanHint();
  		}

  		if (event.target.closest("#qr_div") === null) {
  			//console.log("remove qr");
			document.getElementById("qr-popup").classList.remove('show');
  		}

  		if (event.target.closest("#wechat_div") === null) {
  			//console.log("remove we chat");
			document.getElementById("wechat-popup").classList.remove('show');
  		}

	});

}

//clean up previous states
function cleanUp(){

	//extend cleanUp
	cleanExtend();
	//suggestion cleanUp
	cleanHint();

}

//auto filling
function autoFill(value) {

	document.getElementById("navbar_search_input").value = value;
	document.getElementById("navbar_search_button").click();

}

function cleanHint(){

	var div = document.getElementById('navbar_hint');
	if (div.childNodes.length != 0) div.removeChild(div.firstChild);
	show_hint = false;

}

//giving suggestions to user input
function showHint(typed_letters) {

	var div = document.getElementById('navbar_hint'), ul = document.createElement('ul');

	if (typed_letters.length === 0){

		show_hint = false;

		if(div.childNodes.length != 0) {
			cleanHint();
			return;
		}

	}

	//chars left in the input field
	show_hint = true;
	ask_server("GET", "/hint"+typed_letters, function(hints){

		for (var x in hints) {
			var li = document.createElement('li'), subdiv = document.createElement('div'), content = document.createTextNode(hints[x]);
			subdiv.setAttribute("onclick", "autoFill(\""+hints[x]+"\")");
			subdiv.appendChild(content);
			li.appendChild(subdiv);
			ul.appendChild(li);
		}
		
		//clean up last results anyway, then append if there's new suggestions
		if (div.childNodes.length != 0) cleanHint();
		if (hints.length != 0) div.appendChild(ul);
		
	});

}

//send customized query to an URL
function ask_server(method, body, callback){

	var xhttp;
	xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function(){

		if (this.readyState == 4 && this.status ==200){
			callback(JSON.parse(this.responseText));
			return;
		}

	};
	xhttp.open(method, body);
	xhttp.send();

}

//for gackground rotation
function rotate (event) {

    var x = event.clientX;
    var w = window.innerWidth;
    var midpoint = w / 2;
    var pos = x - midpoint;
	var val = (pos / midpoint) * 0.8;
	var logo = document.getElementById("body_background");
	logo.style.transform = "perspective(550px) rotateY(" + val + "deg)";

}

//clean extended part
function cleanExtend(){

	document.getElementById("navbarheader").style.display = "";
	document.getElementById("navbar_right_arrow").style.display = "";
	document.getElementById("navbar_magnifier").style.display = "";
	document.getElementById("navbar_search_input").classList.remove('extend');
	do_extend = false;

}

function extend() {

	var header = document.getElementById("navbarheader");
	var extend = document.getElementById("navbar_search_input");
	var arrow = document.getElementById("navbar_right_arrow");
	var mag = document.getElementById("navbar_magnifier");
	
	//toggle anyway, negate state
	extend.classList.toggle("extend");
	do_extend = !do_extend;

	//for browser that does not support animation
	do_extend ? header.classList.remove('activated') : header.classList.add('activated');

	if (do_extend){

		mag.style.display = "none";
		arrow.style.display = "initial";
		header.style.display = "none";
		unfade(arrow);

	} else {

		mag.style.display = "";
		arrow.style.display = "";
		header.style.display = "";
		unfade(mag);
		flyin(header);
		cleanHint();

	}

}

function flyin(o) {

	animation = o.animate([
		{ transform: 'translateX(12px)', opacity: 0 },
		{ transform: 'translateX(0px)', opacity: 1 }
		], {duration: 1100, //milliseconds
    	easing: 'ease-in-out', //'linear', a bezier curve, etc.
    	delay: 0, //milliseconds
    	iterations: 1, //or a number
    	direction: 'alternate', //'normal', 'reverse', etc.
    	fill: 'forwards' //'backwards', 'both', 'none', 'auto'
		});

}

// function fade(element) {
//     var op = 1;  // initial opacity
//     var timer = setInterval(function () {
//         if (op <= 0.1){
//             clearInterval(timer);
//             element.style.display = 'none';
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op -= op * 0.1;
//     }, 50);
// }

function unfade(element) {

    var op = 0.1;  // initial opacity
    element.style.opacity = 0;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);

}

function updateView(callback){

	console.log("Screen changed");

	var w = window.outerWidth;
	var h = window.outerHeight;

	if (window.matchMedia('all and (max-width: 620px)').matches){
		console.log("small");
		device_type = 2;

	} else if (window.matchMedia('all and (max-width: 1280px)').matches){
		console.log("middle");
		device_type = 1;
		callback();
	} else {
		console.log("large");
		device_type = 0;
		callback();
	}

	return;

}

function fixedNavbar(){

		didScroll = false;
		x_scroll = window.pageYOffset;
		console.log(x_scroll);
		style = document.getElementById("navbarSearcher").style;
		//small devices like cellphone
		if (device_type == 2 && window.pageYOffset > 44) return;
		//medium devices like ipad
		if (device_type == 1 && window.pageYOffset > 6) return;
		//large devices like pc
		console.log("scroll condition unsatisfied");
		style.position = "";
		style.display = "";
		style.paddingTop = "";
		style.marginTop = "";
		style.width = "";
		style.height = "";

	}

function checkWord(value){

	realLength= value.length;
	//realLength= getStrleng(o.value);
	var wck = document.getElementById("wordCheck");
	console.log(realLength);
	//non-english characters
	//wck.innerHTML = Math.floor((max_length * 2 - realLength) / 2);
	wck.innerHTML = max_length - realLength;

}

function prevent_paste(value){

	text_length = value.length;

	if(text_length > max_length) num = o.value.substring(0, max_length);
	
}

function show(o){

	var popup = document.getElementById(o);

	if(o != null) popup.classList.toggle("show");

}
