max_length = 500;

function checkWord(c){
	//realLength= c.value.length;
	realLength= getStrleng(c.value);
	var wck = document.getElementById("wordCheck");
	console.log(realLength);
	//non-english characters
	//wck.innerHTML = Math.floor((max_length * 2 - realLength) / 2);
	wck.innerHTML = max_length - realLength;

}

//calculate string length
function getStrleng(str){

	myLen = 0;

	for(i = 0;i < str.length;i++){
		if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
			myLen++;
		else
			myLen+=2;
	}

	return myLen;
}