/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-11
 * Time: 下午 3.40
 * 主程序对象.
 */
 function Main(bFirst){

    var _this = this;
	
	base(_this, LSprite, []);

	//是否是第一次加载
	_this.bFirst = bFirst;
	
	//旋转累加度数
	_this.angle = 0;
	
	//旋转角度
	_this.addRoate = 0;

	//是否可以旋转
	_this.bCanRotate = false;

	//选择是几
	_this.iNow = 0;

	_this.init();

 };

 
var m = {
	init: function(){

		var _this = this;

		if(_this.bFirst){
		
			//添加引导页
			_this.guideImgFn();

		}else{
			_this.guideDownFn();
		}

	},
	guideImgFn: function(){

		var _this = this;
		
		_this.guideImgLayer = new LSprite();
		_this.guideImgLayer.addChild(new LBitmap(new LBitmapData(imglist["guideImg"])));
		_this.addChild(_this.guideImgLayer);
		
		
		_this.guideImgLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.guideDownFn, _this)); 

	},
	guideDownFn: function(){

		var _this = this;
		
		if(_this.guideImgLayer){
			_this.guideImgLayer.remove();
		}

		$(".oRoateBtn").show();
		
		//添加大圆背景
		_this.addCircleFn();
		
		//添加小圆按钮
		_this.rotateBtn();

		//添加第一动画
		_this.areaFn();

		//游戏动画
		LTweenLite.to(_this.areaLayer1, 0.3,{
			alpha: 1,
			ease:LEasing.Strong.easeInOut
		});
		LTweenLite.to(_this.areaLayer2, 0.5,{
			alpha: 1,
			delay: 0.2,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				
				//可以旋转
				_this.bCanRotate = true;
				
			}
		});

	},
	addCircleFn: function(){

		var _this = this,
			iR = 650;

		_this.circleLayer = new LSprite();
		_this.circleLayer.x = LGlobal.width * 0.5;
		_this.circleLayer.y = 510
		_this.addChild(_this.circleLayer);

		_this.circle1 = new LSprite();
		_this.circle1.graphics.drawArc(0, "", [0, 0, iR, Tool.toRad(-150), Tool.toRad(-30),false,true], true, "#3fc1d4");
		_this.circleLayer.addChild(_this.circle1);

		_this.circle2 = new LSprite();
		_this.circle2.graphics.drawArc(0, "", [0, 0, iR, Tool.toRad(-30), Tool.toRad(90),false,true], true, "#7673e5");
		_this.circleLayer.addChild(_this.circle2);

		_this.circle3 = new LSprite();
		_this.circle3.graphics.drawArc(0, "", [0, 0, iR, Tool.toRad(90), Tool.toRad(210),false,true], true, "#9cc66f");
		_this.circleLayer.addChild(_this.circle3);
		

	},
	rotateBtn: function(){

		var _this = this;

		_this.rotateBtnLayer = new LSprite();
		_this.rotateBtnLayer.addChild(new LBitmap(new LBitmapData(imglist["rotateBtn"])));
		_this.rotateBtnLayer.x = 130;
		_this.rotateBtnLayer.y = 400;
		_this.addChild(_this.rotateBtnLayer);

		//旋转手势
		touch.on('.oRoateBtn', 'touchstart', function(ev){

			if(!_this.bCanRotate){
				return;
			}

			ev.startRotate();
			ev.preventDefault();

			
			//LTweenLite.to(_this.areaLayer1, 0.5,{
				//alpha: 0,
				//ease:LEasing.Strong.easeInOut
			//});
			//LTweenLite.to(_this.areaLayer2, 0.5,{
				//alpha: 0,
				//ease:LEasing.Strong.easeInOut
			//});

		});
		
		touch.on('.oRoateBtn', 'rotate', function(ev){

			if(!_this.bCanRotate){
				return;
			}

			_this.areaLayer1.alpha = 0;
			_this.areaLayer2.alpha = 0;

			var totalAngle = (_this.angle + ev.rotation) % 360;//Tool.oMath.abs();
			//$(".cs").html(totalAngle+"+"+_this.angle +"+"+ ev.rotation)
			if(ev.fingerStatus === 'end'){
				
				if(!LGlobal.canTouch){
					_this.rotateEndFn();
				}

			}
			//console.log(totalAngle);
			//sIndex = totalAngle;
			//this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
			
			if(ev.direction  == "left"){
				_this.rotateLeft(totalAngle);
			}else{
				_this.rotateRight(totalAngle);
			}

			touch.on('.oRoateBtn', 'touchend', function(){
				
				//$(".cs2").html(ev.rotation);
				
				//_this.rotateEndFn();
				
				if(LGlobal.canTouch){
					_this.rotateEndFn();
				}

			});

		});

	},
	rotateEndFn: function(){

		var _this = this;

		
		//_this.angle = _this.circleLayer.rotate;
		//$(".cs2").html(_this.angle);
		//alert(_this.circleLayer.rotate);

		//不可以旋转
		_this.bCanRotate = false;

		//蓝色 向右转
		if(-60 <= _this.circleLayer.rotate && _this.circleLayer.rotate <= 60){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: 0,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 0;
					//console.log(1);
					//标题动画
					_this.areaAnimFn(0);

					_this.iNow = 0;


				}
			});
		}

		//黄色 向右转
		if(60 < _this.circleLayer.rotate && _this.circleLayer.rotate <= 180){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: 120,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 120;

					//标题动画
					_this.areaAnimFn(1);

					_this.iNow = 1;

				}
			});
		}

		//紫色 向右转
		if(180 < _this.circleLayer.rotate && _this.circleLayer.rotate <= 300){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: 240,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 210;

					//标题动画
					_this.areaAnimFn(2);

					_this.iNow = 2;

				}
			});
		}

		//紫色 向左转
		if(-180 <= _this.circleLayer.rotate && _this.circleLayer.rotate < -60){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: -120,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 210;

					//标题动画
					_this.areaAnimFn(2);

					_this.iNow = 2;

				}
			});
		}

		//黄色 向左转
		if(-300 <= _this.circleLayer.rotate && _this.circleLayer.rotate < -180){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: -240,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 120;

					//标题动画
					_this.areaAnimFn(1);

					_this.iNow = 1;

				}
			});
		}

		//蓝色 向左转
		if(_this.circleLayer.rotate < -300){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: -360,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = -360;
					
					//标题动画
					_this.areaAnimFn(0);

					_this.iNow = 0;

				}
			});
		}
		
		//蓝色 向左转
		if(_this.circleLayer.rotate > 300){
			//console.log(_this.circleLayer.rotate);
			LTweenLite.to(_this.circleLayer, 0.5,{
				rotate: 360,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.angle = 360;
					
					//标题动画
					_this.areaAnimFn(0);

					_this.iNow = 0;

				}
			});
		}
	},
	rotateLeft: function(totalAngle){

		var _this = this;

		_this.circleLayer.rotate = totalAngle;

	},
	rotateRight: function(totalAngle){

		var _this = this;

		_this.circleLayer.rotate = totalAngle;

	},
	areaFn: function(){

		var _this = this;

		_this.areaLayer = new LSprite();
		_this.addChild(_this.areaLayer);
		
		_this.areaLayer1 = new LSprite();
		_this.areaLayer1.alpha = 0;
		_this.area1 = new LBitmap(new LBitmapData(imglist["area"]));
		_this.area1.bitmapData.setCoordinate(0, 0);
		_this.area1.bitmapData.width = 480;
		_this.area1.bitmapData.height = 292;
		_this.areaLayer1.addChild(_this.area1);
		_this.areaLayer.addChild(_this.areaLayer1);
		
		_this.areaLayer2 = new LSprite();
		_this.areaLayer2.alpha = 0;
		_this.area2 = new LBitmap(new LBitmapData(imglist["area"]));
		_this.area2.bitmapData.setCoordinate(480, 0);
		_this.area2.bitmapData.width = 480;
		_this.area2.bitmapData.height = 95;
		_this.areaLayer2.addChild(_this.area2);
		_this.areaLayer2.y = 292;
		_this.areaLayer.addChild(_this.areaLayer2);


		_this.areaLayer1.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(function(){

			console.log(_this.iNow);
			
			//删除当前对象
			_this.remove();

			listLayer =  new List(_this.iNow);
			addChild(listLayer);

		}, _this));
		_this.areaLayer2.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(function(){

			console.log("I"+_this.iNow);
			
			//删除当前对象
			_this.remove();

			//按钮隐藏
			$(".oRoateBtn").hide();
			
			listLayer =  new List(_this.iNow);
			addChild(listLayer);

		}, _this));

	},
	areaAnimFn: function(i){	//动画

		var _this = this;
		
		_this.areaLayer1.childList[0].bitmapData.setCoordinate(0, 292 * i);
		_this.areaLayer2.childList[0].bitmapData.setCoordinate(480, 95 * i);
		
		LTweenLite.to(_this.areaLayer1, 0.5,{
			alpha: 1,
			ease:LEasing.Strong.easeInOut
		});
		LTweenLite.to(_this.areaLayer2, 0.5,{
			alpha: 1,
			delay: 0.2,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				
				//可以旋转
				_this.bCanRotate = true;
				
			}
		});

	}
};

for(var k in m)Main.prototype[k] = m[k];