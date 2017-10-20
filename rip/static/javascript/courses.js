max_length = 250;

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

	console.log(document.getElementById(o).id);

	var popup = document.getElementById(document.getElementById(o).id);
	if(o != null){
		popup.classList.toggle("show");
	}

}