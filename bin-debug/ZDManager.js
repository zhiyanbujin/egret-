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
var ZDManager = (function (_super) {
    __extends(ZDManager, _super);
    function ZDManager(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.zm = new Array();
        return _this;
    }
    //每create一次就new一个
    ZDManager.prototype.create = function (id, x, y, v, n, game) {
        //生成子弹
        var one = new ZD(id, x, y, v, n, game);
        //添加到世界
        this.addChild(one);
        //放到仓库数组最后
        this.zm.push(one);
    };
    //更新所有子弹，找到每一颗子弹，每颗更新
    ZDManager.prototype.update = function () {
        //整个仓库长度 ，利用循环可 以循环出所有子弹
        for (var i = 0; i < this.zm.length; i++) {
            //找到每颗子弹
            var one = this.zm[i];
            one.update();
            //j是NPC game是上一级，nm：所有NPC(工厂) ，nm:仓库数组Array.length 仓库长度
            for (var j = 0; j < this.game.nm.nm.length; j++) {
                var npc = this.game.nm.nm[j];
                if (npc.isHit(one.x, one.y) == true) {
                    npc.hp -= one.gj;
                    //NPC消失
                    if (npc.hp <= 0) {
                        npc.dead();
                        npc.vis = false;
                    }
                    //子弹消失
                    one.vis = false;
                    //子弹和NPC碰撞结束，
                    break;
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
    return ZDManager;
}(egret.Sprite));
__reflect(ZDManager.prototype, "ZDManager");
//# sourceMappingURL=ZDManager.js.map