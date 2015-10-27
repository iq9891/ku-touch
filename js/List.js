/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-12
 * Time: 下午 1.40
 * 列表程序对象.
 */
 function List(iCnow){

    var _this = this;
	
	base(_this, LSprite, []);

	//颜色值的索引
	_this.colorNow = iCnow;
	
	//旋转累加度数
	_this.angle = 0;
	
	//记录滚动文字
	_this.iFont = 0;
	
	//半径
	_this.iR = 400; //220;//

	//可以旋转
	_this.bCanRotate = false;

	//可以点击数字
	_this.bCanNum = false;
			
	//列表页文字索引
	_this.iNewIndex = 0;

	_this.bgColor = aBgColor[iCnow];
	_this.color = aColor[iCnow];
	
	_this.init();

 };

 
var l = {
	init: function(){

		var _this = this;
		
		//添加引导页
		_this.bgFn();

	},
	bgFn: function(){

		var _this = this;
		
		_this.bgLayer = new LSprite();
		_this.bgLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, aBgColor[_this.colorNow]);
		_this.addChild(_this.bgLayer);

		_this.allLayer = new LSprite();
		_this.addChild(_this.allLayer);
		
		//添加圈
		_this.ringFn();

		//圆圈的动画
		_this.showRingFn(8);
		_this.showRingFontFn(0);

		//添加旋转按钮
		_this.rotateBtnFn();

		//添加项目标题
		_this.titFn();

		//添加预览按钮
		_this.addLookFn();

		//添加关闭按钮
		//_this.addCloseFn();

		//添加返回按钮
		_this.backFn();

	},
	rotateBtnFn: function(){

		var _this = this;
		
		_this.rotateBtnLayer = new LSprite();
		_this.rotateBtnLayer.addChild(new LBitmap(new LBitmapData(imglist["rotateListBtn"])));
		_this.rotateBtnLayer.x = 20;
		_this.rotateBtnLayer.y = 286;
		_this.allLayer.addChild(_this.rotateBtnLayer);
		

		//添加旋转事件
		//旋转手势
		touch.on('.oRoateListBtn', 'touchstart', function(ev){

			if(!_this.bCanRotate){
				return;
			}

			ev.startRotate();
			ev.preventDefault();

		});
		
		touch.on('.oRoateListBtn', 'rotate', function(ev){

			var totalAngle = (_this.angle + ev.rotation) % 360 + 15,
				index = Tool.oMath.abs(totalAngle) / 30 >> 0;

			if(ev.fingerStatus === 'end'){
				_this.angle += ev.rotation;

				//console.log(_this.ringAllLayer.rotate / 30 >> 0);
				//console.log(_this.ringAllLayer.rotate);

			}

			//console.log(totalAngle+"+");
					
			_this.ringAllLayer.rotate = totalAngle;

			if(ev.direction  == "left"){
				_this.ringFont.text = aTit[aTit.length - index - 1];
			}else{

				//更新文字
				if(aTit[index]){
					_this.ringFont.text = aTit[index];
					_this.iFont = index;
				}else{
					_this.ringFont.text = aTit[0];
					_this.iFont = 0;
				}

			}

		});

	},
	ringFn: function(){

		var _this = this,
			i = 0,
			i2 = 0,
			len = 12;

		//总的
		_this.ringAllLayer = new LSprite();
		_this.ringAllLayer.rotate = 15;
		_this.ringAllLayer.x = 240;
		_this.ringAllLayer.y = 510;
		_this.allLayer.addChild(_this.ringAllLayer);

		_this.ringForArea = new LSprite();
		_this.ringAllLayer.addChild(_this.ringForArea);
		_this.ringFontArea = new LSprite();
		_this.ringAllLayer.addChild(_this.ringFontArea);
		_this.ringClickArea = new LSprite();
		_this.ringAllLayer.addChild(_this.ringClickArea);
		
		for(i=0; i < len; i++){
			
			//_this.addRingFn(i);
			_this.ringLayer = new LSprite();
			_this.ringLayer.myIndex = i;
			_this.ringLayer.alpha = 0;
			_this.ringLayer.graphics.drawArc(0, "", [0, 0, _this.iR, Tool.toRad(30 * i), Tool.toRad(30 * i + 25),false,true], true, aColor[_this.colorNow]);
			_this.ringForArea.addChild(_this.ringLayer);
			//console.log(Tool.toRad(30 * i + 25));
			
			//添加点击区域
			_this.addClickAreaFn(i);

		}
		

		//console.log(Tool.oMath.cos(Tool.toRad(20)));
		for(i2=0; i2 < len - 3; i2++){
			_this.addRingFontFn(20, i2, 80);//80 //40
		}

		//10
		_this.addRingFontFn(26, 9, 70);//70 //40

		//11
		_this.addRingFontFn(26, 10, 70);//70 //40

		//12
		_this.addRingFontFn(26, 11, 70);//70 //40
		
		
		_this.ringClickArea.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(_this.ringClickFn, _this));

	}, 
	ringClickFn: function(event){

		var _this = this;

		if(!_this.bCanNum){
			return;
		}
		
		//点击弹框
		//点击介绍
		//event.currentTarget.removeChild(event.target);
		
		//删除现有列表
		_this.allLayer.alpha = 0;

		//隐藏返回按钮
		_this.backLayer.remove();
		_this.backLayer.die();

		//不可以旋转
		_this.bCanRotate = false;

		//隐藏旋转div
		$(".oRoateListBtn").hide();


		//显示关闭滚动弹框按钮
		_this.addCloseFn();

		//显示预览按钮
		_this.lookLayer.alpha = 1;


		var iNow = event.currentTarget.getChildIndex(event.target);
		
		_this.iNewIndex = 0;

		switch(iNow){
			case 8:
				iNewIndex = 1;
				break;
			case 7:
				iNewIndex = 2;
				break;
			case 6:
				iNewIndex = 3;
				break;
			case 5:
				iNewIndex = 4;
				break;
			case 4:
				iNewIndex = 5;
				break;
			case 3:
				iNewIndex = 6;
				break;
			case 2:
				iNewIndex = 7;
				break;
			case 1:
				iNewIndex = 8;
				break;
			case 0:
				iNewIndex = 9;
				break;
			case 11:
				iNewIndex = 10;
				break;
			case 10:
				iNewIndex = 11;
				break;
			case 9:
				iNewIndex = 12;
				break;
		
		}
		console.log(iNow +"+"+ _this.iNewIndex);
		
		_this.ringFont.text = aTit[iNewIndex - 1];

		$(".iwInfo").html(aInfo[iNewIndex - 1]);

		var myScroll = new IScroll('.iscrollWrap', {scrollbars: 'custom' });

		$(".iscrollWrap").css({
			"opacity": 1,
			"zIndex": 99
		});

	},
	addClickAreaFn: function(i){

		var _this = this;

		_this.rClickLayer = new LSprite();
		_this.ringClickArea.addChild(_this.rClickLayer);
		_this.rClickLayer.addShape(LShape.VERTICES,[
			[0,0],
			[Tool.oMath.cos(Tool.toRad(25 * i + 5 * i)) * _this.iR, Tool.oMath.sin(Tool.toRad(25 * i + 5 * i)) *  _this.iR],
			[ Tool.oMath.cos(Tool.toRad(25 * (i+1) + 5 * i)) *  _this.iR,  Tool.oMath.sin(Tool.toRad(25 * (i+1) + 5 * i)) *  _this.iR]]
		);

	}, 
	addRingFn: function(i){

		var _this = this;

		_this.ringLayer = new LSprite();
		_this.ringLayer.myIndex = i;
		_this.ringLayer.alpha = 0;
		_this.ringLayer.graphics.drawArc(0, "", [0, 0, _this.iR, Tool.toRad(30 * i), Tool.toRad(30 * i + 25),false,true], true, "#5ed8ea");
		_this.ringForArea.addChild(_this.ringLayer);

	},
	addRingFontFn: function(iNum, i, size){

		var _this = this;

		_this.ringFont = new LTextField();
		_this.ringFont.alpha = 0;
		_this.ringFont.rotate = -15 - 30 * i;
		_this.ringFont.x = - _this.iR * Tool.oMath.sin(Tool.toRad(iNum + 30 * i));
		_this.ringFont.y = - _this.iR * Tool.oMath.cos(Tool.toRad(iNum + 30 * i));
		_this.ringFont.color = "#ffffff";
		_this.ringFont.size = size; //40;
		_this.ringFont.text = i + 1;
		_this.ringFontArea.addChild(_this.ringFont);

	},
	showRingFontFn: function(iNum){

		var _this = this;

		//console.log(iNum+"iNum");

		//叠加
		LTweenLite.to(_this.ringAllLayer.childList[1].childList[iNum],0.1,{
			alpha:1,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				_this.showRingFontFn(iNum + 1);
			}
		})
			
	},
	showRingFn: function(iNum){

		var _this = this;

		if(iNum == -1){
			iNum = 11;
		}
		if(iNum == 9){
			LTweenLite.to(_this.ringAllLayer.childList[0].childList[9],0.2,{
				alpha:1,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){

					//可以旋转
					_this.bCanRotate = true;

					//显示旋转div
					$(".oRoateListBtn").show();
					
					//可以点击数字
					_this.bCanNum = true;
					
				}
			})
			return;
		}
		//console.log(iNum+"iNum");

		//叠加
		LTweenLite.to(_this.ringAllLayer.childList[0].childList[iNum],0.1,{
			alpha:1,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				_this.showRingFn(iNum - 1);
			}
		});
			
	},
	titFn: function(){

		var _this = this;

		_this.titAllLayer = new LSprite();
		_this.titAllLayer.x = LGlobal.width * 0.5;
		_this.addChild(_this.titAllLayer);

		_this.titLayer = new LSprite();
		_this.titAllLayer.addChild(_this.titLayer);
		
		_this.ringFont = new LTextField();
		_this.ringFont.textAlign = "center";
		_this.ringFont.y = 20;
		_this.ringFont.color = "#000000";
		_this.ringFont.size = 24;
		_this.ringFont.text = aTit[0];
		_this.titLayer.addChild(_this.ringFont);

	},
	addLookFn: function(){

		var _this = this;
		
		_this.lookLayer = new LSprite();
		_this.lookLayer.alpha = 0;
		_this.lookLayer.addChild(new LBitmap(new LBitmapData(imglist["look"])));
		_this.lookLayer.x = 200;
		_this.lookLayer.y = 580;
		_this.addChild(_this.lookLayer);

		_this.lookLayer.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(function(event){
			
			location.href = aLink[_this.iFont];
		
		}, _this));

	},
	addCloseFn: function(){

		var _this = this;
		
		_this.closeLayer = new LSprite();
		_this.closeLayer.addChild(new LBitmap(new LBitmapData(imglist["close"])));
		_this.closeLayer.x = 420;
		_this.closeLayer.y = 10;
		_this.addChild(_this.closeLayer);

		_this.closeLayer.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(function(event){
			
			//关闭滚动弹框
			_this.closeFn();
		
		}, _this));

	},
	closeFn: function(){

		var _this = this;

		_this.ringFont.text = aTit[_this.iFont];
		
		$(".iscrollWrap").css({
			"opacity": 0,
			"zIndex": 1
		});
			
			
		//删除现有列表
		_this.allLayer.alpha = 1;

		//不可以旋转
		_this.bCanRotate = true;

		//显示旋转div
		$(".oRoateListBtn").show();


		//删除关闭滚动弹框按钮
		_this.closeLayer.remove();
		_this.closeLayer.die();

		//隐藏预览按钮
		_this.lookLayer.alpha = 0;

		//添加返回按钮
		_this.backFn();


	},
	backFn: function(){

		var _this = this;
		
		_this.backLayer = new LSprite();
		_this.backLayer.addChild(new LBitmap(new LBitmapData(imglist["back"])));
		_this.backLayer.x = 420;
		_this.backLayer.y = 10;
		_this.addChild(_this.backLayer);

		_this.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(function(event){
			
			//删除当前对象
			_this.remove();

			//隐藏旋转按钮
			$(".oRoateListBtn").hide();


			mainLayer =  new Main();
			addChild(mainLayer);
		
		}, _this));
	}
};

for(var k in l)List.prototype[k] = l[k];