window.onload = function() {
	// TODO
	fadeInMain();
};


var op1 = 0;
function fadeInMain(){
	op1 ++;
	document.getElementById("wrapper").style.filter = "alpha(opacity="+op1+")";
	document.getElementById("wrapper").style.opacity = ( op1 / 100 );
    document.getElementById("wrapper").style.MozOpacity = ( op1 / 100 );
    document.getElementById("wrapper").style.KhtmlOpacity = ( op1 / 100 );
	if(op1 < 100){
		window.setTimeout('fadeInMain()',2);
	}
}

