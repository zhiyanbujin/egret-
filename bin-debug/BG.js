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
var BG = (function (_super) {
    __extends(BG, _super);
    function BG(game) {
        var _this = _super.call(this) || this;
        _this.bg = [];
        _this.game = game;
        for (var i = 0; i < 2; i++) {
            _this.bg[i] = Main.createBitmapByName("bg11_jpg");
            _this.addChild(_this.bg[i]);
            //对图片的定位
            _this.bg[i].y = 0 - i * _this.bg[i].height;
        }
        //前景
        _this.fg = Main.createBitmapByName("bg12_png");
        _this.fg.y = Math.random() * 800;
        _this.addChild(_this.fg);
        _this.vy = 10; //背景移动速度
        return _this;
    }
    BG.prototype.update = function () {
        //背景更新
        for (var i = 0; i < 2; i++) {
            //图片向下移动
            this.bg[i].y += this.vy;
            //当图片移动到屏幕下面就得放到上面
            if (this.bg[i].y > 800) {
                //有几张图片就挪到几张图片高度
                this.bg[i].y -= 2 * this.bg[i].height;
            }
        }
        this.fg.y += this.vy * 1.5;
        if (this.fg.y > 800) {
            this.resetFG();
        }
    };
    //重置前景
    BG.prototype.resetFG = function () {
        //随机0~2   0天梯，1，2
        var id = Math.floor(Math.random() * 3);
        switch (id) {
            case 0:
                this.fg.texture = RES.getRes("bg12_png");
                if (Math.random() * 100 < 50) {
                    this.fg.scaleX = -1;
                    this.fg.x = 480;
                }
                else {
                    this.fg.scaleX = 1;
                    this.fg.x = 0;
                }
                break;
            case 1:
                this.fg.texture = RES.getRes("bg13_png");
                this.fg.x = 480 - Math.random() * 184;
                this.fg.scaleX = 1;
                break;
            case 2:
                this.fg.texture = RES.getRes("bg13_png");
                this.fg.x = Math.random() * 184;
                this.fg.scaleX = -1;
                break;
        }
        this.fg.y = -500 - Math.random() * 100;
    };
    BG.prototype.reset = function () {
        switch (this.game.level) {
            case 0:
                for (var i = 0; i < 2; i++) {
                    this.bg[i].texture = RES.getRes("bg11_jpg");
                }
                break;
            case 1:
                for (var i = 0; i < 2; i++) {
                    this.bg[i].texture = RES.getRes("bg31_jpg");
                }
                break;
        }
    };
    return BG;
}(egret.Sprite));
__reflect(BG.prototype, "BG");
//# sourceMappingURL=BG.js.map