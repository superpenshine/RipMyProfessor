max_length = 250;
didScroll = false;
device_type = 0;
x = 0;
do_extend = false;

updateView();

if (document.addEventListener){
	//window.addEventListener("scroll", fixedNavbar);
	window.addEventListener("resize", updateView, false);
	//window.addEventListener("fullscreenchange", updateView, false);
}

function extend() {

	var header = document.getElementById("navbarheader");
	var extend = document.getElementById("navbarextendinput");
	extend.classList.toggle("extend");

	console.log(do_extend);
	do_extend = !do_extend;
	do_extend ? header.style.display = "none" : header.style.display = "";

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
		x = window.pageYOffset;
		console.log(x);
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
