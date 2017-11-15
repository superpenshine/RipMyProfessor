max_length = 250;
didScroll = false;
device_type = 0;
x_scroll = 0;
do_extend = false;
show_hint = false;

updateView();

if (document.addEventListener){
	//window.addEventListener("scroll", fixedNavbar);
	window.addEventListener("resize", updateView, false);
	//document.addEventListener("mousemove", function(event){rotate(event)});
	//window.addEventListener("fullscreenchange", updateView, false);
}

function showHint(typed_letters) {
	//no clue, no hint
	console.log(typed_letters);
	var div = document.getElementById('navbar_hint'), ul = document.createElement('ul');

	//delete if no char left in the input field
	if (typed_letters.length === 0) {
		show_hint = false;
		div.removeChild(div.firstChild);
		console.log("delete entirely");
		return;
	}
	//chars left in the input field
	show_hint = true;
	ask_server("GET", "/hint"+typed_letters, function(hints){
		for (var x in hints) {
			var li = document.createElement('li'), content = document.createTextNode(hints[x]);
			li.appendChild(content);
			ul.appendChild(li);
		}

		if (hints.length != 0) {
			//display new suggestions, clean up old suggestions.
			if (div.childNodes.length != 0) div.removeChild(div.firstChild);
			//assume no new suggestions
			div.appendChild(ul);
			//no new suggestion foudn using the clue, delete all !
		} else if (div.childNodes.length != 0) div.removeChild(div.firstChild); show_hint = false;
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

function extend() {

	var header = document.getElementById("navbarheader");
	var extend = document.getElementById("navbarextendinput");
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
		unfade(arrow);
		header.style.display = "none";

	} else {

		mag.style.display = "";
		unfade(mag);
		arrow.style.display = "";
		header.style.display = "";
		flyin(header);

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

function updateView(){

	console.log("Screen changed");

	if (window.matchMedia('all and (max-width: 442px)').matches){
		console.log("small");
		device_type = 2;

	} else if (window.matchMedia('all and (max-width: 838px)').matches){
		console.log("middle");
		device_type = 1;

	} else {
		console.log("large");
		device_type = 0;

	}

}

function fixedNavbar(){

		didScroll = false;
		x_scroll = window.pageYOffset;
		console.log(x_scroll);
		style = document.getElementById("navbarSearcher").style;
		//small devices like cellphone
		if (device_type == 2 && window.pageYOffset > 44){
			return;
		}
		//medium devices like ipad
		if (device_type == 1 && window.pageYOffset > 6){
			return;
		}
		//large devices like pc
		console.log("scroll condition unsatisfied");
		style.position = "";
		style.display = "";
		style.paddingTop = "";
		style.marginTop = "";
		style.width = "";
		style.height = "";

	}

function checkWord(o){

	realLength= o.value.length;
	//realLength= getStrleng(o.value);
	var wck = document.getElementById("wordCheck");
	console.log(realLength);
	//non-english characters
	//wck.innerHTML = Math.floor((max_length * 2 - realLength) / 2);
	wck.innerHTML = max_length - realLength;

}
//calculate string length
// function getStrleng(str){
// 	myLen = 0
// 	for(i = 0;i < str.length;i++){
// 		if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
// 			myLen++;
// 		else
// 			myLen+=2;
// 	}
// 	return myLen;
// }
//prevent paste from excessing word limits
function prevent_paste(o){

	text_length = o.value.length;

	if(text_length > max_length){
		num = o.value.substring(0, max_length);
	}
	
}

function show(o){

	var popup = document.getElementById(o);
	if(o != null){
		popup.classList.toggle("show");
	}

}
