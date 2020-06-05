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
var TX = (function (_super) {
    __extends(TX, _super);
    function TX(id, x, y, t, l, tm) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.x = x;
        _this.y = y;
        _this.t = t;
        _this.l = l;
        _this.m = 0;
        _this.fi = 0;
        _this.vis = true; //若它是false 工厂内对象消失
        _this.tm = tm;
        _this.im = Main.createBitmapByName("tx1_1_png");
        _this.anchorOffsetX = _this.im.width / 2;
        _this.anchorOffsetY = _this.im.height / 2;
        _this.addChild(_this.im);
        //随机角度。
        _this.rotation = Math.random() * 360;
        if (_this.t > 0) {
            //虽然在仓库，但是看不到
            //0 是倒计时， 1是播放
            _this.visible = false;
            _this.m = 0;
        }
        else {
            _this.visible = true;
            _this.m = 1;
        }
        return _this;
    }
    TX.prototype.update = function () {
        switch (this.m) {
            //
            case 0:
                //倒计时
                this.t--;
                if (this.t <= 0) {
                    //出现爆炸
                    this.visible = true;
                    this.m = 1; //播放
                }
                break;
            case 1:
                //动画播放
                this.fi++;
                //
                if (this.fi >= this.l) {
                    this.vis = false; //工厂里对象销毁
                }
                else {
                    //动画切换公式	fi从0开始，到9，
                    //10是动画的张数有几张动画就*几。 fi是动画帧，l是动画长度，
                    this.im.texture = RES.getRes("tx1_" + Math.floor(this.fi * 10 / this.l + 1) + "_png");
                }
        }
    };
    return TX;
}(egret.Sprite));
__reflect(TX.prototype, "TX");
//# sourceMappingURL=TX.js.map