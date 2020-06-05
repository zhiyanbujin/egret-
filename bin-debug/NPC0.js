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
var NPC0 = (function (_super) {
    __extends(NPC0, _super);
    function NPC0(x, y, vy, nm) {
        var _this = _super.call(this, nm) || this;
        _this.im = []; //2张拼起来的图片所以用数组
        _this.x = x;
        _this.y = y;
        _this.vy = vy;
        _this.hp = 5;
        // for(let i = 0 ; i < 2; i++){
        // 	this.im[i] = Main.createBitmapByName("");
        // }
        _this.im[0] = Main.createBitmapByName("npc5_png");
        _this.im[0].anchorOffsetX = _this.im[0].width;
        _this.im[0].anchorOffsetY = _this.im[0].height / 2;
        _this.addChild(_this.im[0]);
        _this.im[1] = Main.createBitmapByName("npc5_png");
        _this.im[1].anchorOffsetX = _this.im[1].width;
        _this.im[1].anchorOffsetY = _this.im[1].height / 2;
        _this.im[1].scaleX = -1;
        _this.addChild(_this.im[1]);
        return _this;
    }
    NPC0.prototype.update = function () {
        this.y += this.vy;
        if (this.y > 1000) {
            this.vis = false;
        }
    };
    //检测玩家子弹是否碰撞NPC，所以用布尔值 ，需要知道玩家子弹位置，所以需要X,Y
    NPC0.prototype.isHit = function (x, y) {
        if (Math.abs(x - this.x) < this.im[0].width &&
            Math.abs(y - this.y) < this.im[0].height / 2) {
            return true;
        }
        //若没有子弹，返回false
        return false;
    };
    NPC0.prototype.dead = function () {
        for (var k = 0; k < 5; k++) {
            this.nm.game.tm.create(0, this.x + Math.random() * 50 - 25, this.y + Math.random() * 50 - 25, Math.floor(Math.random() * 5), 10, this.nm.game);
        }
    };
    return NPC0;
}(NPC));
__reflect(NPC0.prototype, "NPC0");
//# sourceMappingURL=NPC0.js.map