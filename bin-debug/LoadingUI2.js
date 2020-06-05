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
var LoadingUI2 = (function (_super) {
    __extends(LoadingUI2, _super);
    function LoadingUI2() {
        var _this = _super.call(this) || this;
        _this.im1 = Main.createBitmapByName("game_uijn1_png");
        _this.addChild(_this.im1);
        _this.im1.y = 490;
        _this.im1.width = 480;
        _this.im = Main.createBitmapByName("game_uijn2_png");
        _this.addChild(_this.im);
        _this.im.y = 500;
        _this.im.scaleX = 0;
        _this.im.width = 480;
        return _this;
    }
    LoadingUI2.prototype.onProgress = function (current, total) {
        //进度条伸长效果
        this.im.scaleX = current / total;
    };
    return LoadingUI2;
}(egret.Sprite));
__reflect(LoadingUI2.prototype, "LoadingUI2", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI2.js.map