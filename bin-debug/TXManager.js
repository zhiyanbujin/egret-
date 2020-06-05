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
var TXManager = (function (_super) {
    __extends(TXManager, _super);
    function TXManager(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.tm = new Array();
        return _this;
    }
    //每create一次就new一个
    TXManager.prototype.create = function (id, x, y, t, l, game) {
        //生成子弹
        var one = new TX(id, x, y, t, l, this);
        //添加到世界
        this.addChild(one);
        //放到仓库数组最后
        this.tm.push(one);
    };
    //更新所有子弹，找到每一颗子弹，每颗更新
    TXManager.prototype.update = function () {
        //整个仓库长度 ，利用循环可 以循环出所有子弹
        for (var i = 0; i < this.tm.length; i++) {
            //找到每颗子弹
            var one = this.tm[i];
            one.update();
            //若子弹太多，仓库会满，所以子弹需要移除
            //子弹出屏，vis == false。移除
            if (one.vis == false) {
                //先从场景移除
                this.removeChild(one);
                //仓库移除 
                this.tm.splice(i, 1);
                //移除一个对象，长度-1
                i--;
            }
        }
    };
    return TXManager;
}(egret.Sprite));
__reflect(TXManager.prototype, "TXManager");
//# sourceMappingURL=TXManager.js.map