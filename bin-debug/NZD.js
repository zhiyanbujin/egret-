var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NZD = (function (_super) {
    __extends(NZD, _super);
    function NZD(id, x, y, //子弹生成位置
        v, n, //速度与角度							
        game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.id = id;
        switch (_this.id) {
            case 0:
                _this.im = Main.createBitmapByName("nzd1_png");
                _this.addChild(_this.im);
                break;
            case 1:
                _this.im = Main.createBitmapByName("nzd2_png");
                _this.addChild(_this.im);
                break;
        }
        _this.im.anchorOffsetX = _this.im.width / 2;
        _this.im.anchorOffsetY = _this.im.height / 2;
        _this.x = x;
        _this.y = y;
        _this.v = v;
        _this.n = n;
        //sin用的是弧度制 n是角度制，所以 n* Math.PI / 180 转换为弧度制。
        _this.vx = v * Math.sin(n * Math.PI / 180);
        _this.vy = -v * Math.cos(n * Math.PI / 180);
        //因为导弹类型不需要旋转
        if (_this.id != 3)
            _this.im.rotation = n;
        _this.vis = true;
        return _this;
    }
    NZD.prototype.update = function () {
        // if(this.id == 3){
        // 	this.im.texture = RES.getRes("nzd1_"+Math.floor(Math.random()*2 + 3)+"_png");
        // 	switch(this.m ){
        // 		//初始角度更新10次主循环
        // 		case 0 :
        // 			this.t++;
        // 			this.x+=this.vx;
        // 			this.y+=this.vy;
        // 			if(this.t >=10){
        // 				this.t =0;
        // 				this.m =1;
        // 			}
        // 		break;
        // 		//发出后停滞一段时间
        // 		case 1:
        // 			this.t++;
        // 			if(this.t >=5){
        // 				this.t =0;
        // 				this.m =2;
        // 				this.vy = 0;
        // 			}
        // 			break;
        // 		//向上加速运动
        // 		case 2:
        // 			this.y+=this.vy;
        // 			this.vy -=2;
        // 			//这段是独立代码，所以需要检测出屏子弹消失
        // 			if(this.y <-100)
        // 				this.vis = false;
        // 			break;
        // 	}
        // 	return;	//跳出
        // }
        this.x += this.vx;
        this.y += this.vy;
        // //闪烁子弹
        // if(this.id ==2){
        // 	this.t++;
        // 	if(this.t >= 6){
        // 		this.t = 0;
        // 		//图片会变，所以t在0。1，2时除以3是0.几+3取整为3，t为3，4，5时除以3为1.几+3取整为4
        // 		//这样结果就为3和4之间变化。图片名为3和4
        // 		this.im.texture = RES.getRes("nzd1_png"+Math.floor(this.t/3 + 3)+"_png");
        // 	}
        // }
        //子弹超出屏幕，子弹消失
        //被工厂管理的对象一定要有销毁条件。
        if (this.x < -100 || this.x > 580 || this.y < -100 || this.y > 900)
            this.vis = false;
    };
    return NZD;
}(egret.Sprite));
__reflect(NZD.prototype, "NZD");
//# sourceMappingURL=NZD.js.map