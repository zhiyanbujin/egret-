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
var NZDManager = (function (_super) {
    __extends(NZDManager, _super);
    function NZDManager(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.zm = new Array();
        return _this;
    }
    //每create一次就new一个
    NZDManager.prototype.create = function (id, x, y, v, n) {
        //如果n角度是空的，就是没有赋值
        if (!n) {
            n = Math.atan2(this.game.player.x - x, y - this.game.player.y);
            //注意：三角函数算出的都是弧度制，还需要弧度制转换角度制
            n = n * 180 / Math.PI;
        }
        //生成子弹
        var one = new NZD(id, x, y, v, n, this.game);
        //添加到世界
        this.addChild(one);
        //放到仓库数组最后
        this.zm.push(one);
    };
    //更新所有子弹，找到每一颗子弹，每颗更新
    NZDManager.prototype.update = function () {
        //整个仓库长度 ，利用循环可以循环出所有子弹
        for (var i = 0; i < this.zm.length; i++) {
            //找到每颗子弹
            var one = this.zm[i];
            one.update();
            if (this.game.player.isHit(one.x, one.y) == true) {
                one.vis = false;
                if (this.game.player.m == 1 && this.game.player.bhT <= 0) {
                    this.game.player.dead();
                }
            }
            //若子弹太多，仓库会满，所以子弹需要移除
            //子弹出屏，vis == false。移除
            if (one.vis == false) {
                //先从场景移除
                this.removeChild(one);
                //仓库移除 
                this.zm.splice(i, 1);
                //移除一个对象，长度-1
                i--;
            }
        }
    };
    NZDManager.prototype.reset = function () {
        for (var i = 0; i < this.zm.length; i++) {
            var one = this.zm[i];
            this.removeChild(one);
            this.zm.splice(i, 1);
            i--;
        }
    };
    return NZDManager;
}(egret.Sprite));
__reflect(NZDManager.prototype, "NZDManager");
//# sourceMappingURL=NZDManager.js.map