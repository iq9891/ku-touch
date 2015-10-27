var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/touch.min.js" },
			{ type: "js", path: "./js/Main.js" },
			{ type: "js", path: "./js/List.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ name: "guideImg", path: "./images/guideImg.jpg" },
			{ name: "rotateBtn", path: "./images/rotateBtn.png" },
			{ name: "rotateListBtn", path: "./images/rotateListBtn.png" },
			{ name: "look", path: "./images/look.png" },
			{ name: "close", path: "./images/close.png" },
			{ name: "back", path: "./images/back.png" },
			{ name: "area", path: "./images/area.png" }
		],
		imglist,
		_win = window,
		_doc = document,
		onFrameLayer = null,
		angle = 0,
		mainLayer = null,
		listLayer = null,
		aBgColor = ['#3fc1d4','#9cc670','#7673e6'],
		aColor = ['#5ed8ea', "#b6e08a", "#6663d6"],
		//列表标题
		aTit = ['文字1','文字2','文字3','文字4','文字5','文字6','文字7','文字8','文字9','文字10','文字11','文字12'],
		//列表简介
		aInfo = ['文字介绍1','文字介绍2','文字介绍3','文字介绍4','文字介绍5','文字介绍6','文字介绍7','文字介绍8','文字介绍9','文字介绍10','文字介绍11','文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12文字介绍12'],
		//列表链接
		aLink = ['http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com'],
		twoRotating = false; 

function doScroll() {
    if (_win.pageYOffset === 0) {
        _win.scrollTo(0, 1);
    }
}

_win.addEventListener('load', function () {
    setTimeout(doScroll, 100);
}, false);

_win.onorientationchange = function () {
    setTimeout(doScroll, 100);
};
_win.onresize = function () {
    setTimeout(doScroll, 100);
};

_doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

LInit(16.6, "legend", 480, 756, main); //16.6


//设置全屏
//if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.align = LStageAlign.TOP_MIDDLE;
	LSystem.screen(LStage.FULL_SCREEN);
//}

function main() {
    var loadingLayer = new LoadingSample4();
    addChild(loadingLayer);
    LLoadManage.load(
		imgData,
		function (progress) {
		    loadingLayer.setProgress(progress);
		},
		function (result) {
		    imglist = result;
		    removeChild(loadingLayer);
		    loadingLayer = null;
		    gameInit();
		}
	);
};
function gameInit(event) {

    var _this = this;
    onFrameLayer = new LSprite();

    addChild(onFrameLayer);

    //调试模式
    //LGlobal.setDebug(true);

    //游戏初始
	mainLayer =  new Main(true);
	addChild(mainLayer);

	//listLayer =  new List(0);
	//addChild(listLayer);

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	
};


function onframe() {
	
	//if(mainLayer.circleLayer){
		//mainLayer.circleLayer.rotate++;
	//}
	//mainLayer.circleLayer.rotate++;
	//listLayer.ringAllLayer.rotate++;

};
