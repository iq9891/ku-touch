function styleJs(){

	var pingKuan=$("#legend canvas").width(),
		bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
		};

	
	$(".oRoateBtn").css({
		"width": pingKuan * bili(220),
		"height": pingKuan * bili(220),
		"left": ( $(window).width() - pingKuan * bili(220) ) * 0.5,//pingKuan * bili(130),
		"top": pingKuan * bili(400)
	});
	
	$(".oRoateListBtn").css({
		"width": pingKuan * bili(440),
		"height": pingKuan * bili(440),
		"left": ( $(window).width() - pingKuan * bili(440) ) * 0.5,//pingKuan * bili(130),
		"top": pingKuan * bili(286)
	});
	
	//自定义滚动条

	$(".iscrollWrap").css({
		"width": pingKuan,
		"height": pingKuan * bili(440),
		"top": pingKuan * bili(80),
		"left" : $("#legend canvas").css("marginLeft")
	});
	//$(".iScrollVerticalScrollbar").css({
		//"right": pingKuan * bili(20)
	//});
	$(".iwInfo").css({
		"width": pingKuan * bili(430),
		"paddingLeft" : pingKuan * bili(20)
	});
	
	
	//$(".iscrollWrap").css({
		//"opacity":1
	//});
};
	
function loaded(){
	setTimeout(function(){
		styleJs();
	},1000);
}

function hengshuping(){
	if(window.orientation==180||window.orientation==0){
		loaded();
	};
	if(window.orientation==90||window.orientation==-90){
		loaded();
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

window.addEventListener('load', loaded, false);
