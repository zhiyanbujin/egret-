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
var NPC1 = (function (_super) {
    __extends(NPC1, _super);
    function NPC1(x, y, vy, dy, nm) {
        var _this = _super.call(this, nm) || this;
        //飞下来转向回去
        _this.im = [];
        _this.x = x;
        _this.y = y;
        _this.vy = vy;
        _this.dy = dy;
        _this.hp = 10;
        _this.m = 0;
        _this.t = 0;
        _this.im[0] = Main.createBitmapByName("npc6_png");
        _this.im[0].anchorOffsetX = _this.im[0].width;
        _this.im[0].anchorOffsetY = _this.im[0].height / 2;
        _this.addChild(_this.im[0]);
        _this.im[1] = Main.createBitmapByName("npc6_png");
        _this.im[1].anchorOffsetX = _this.im[1].width;
        _this.im[1].anchorOffsetY = _this.im[1].height / 2;
        _this.im[1].scaleX = -1;
        _this.addChild(_this.im[1]);
        return _this;
    }
    NPC1.prototype.update = function () {
        switch (this.m) {
            //向下飞
            case 0:
                //向下飞
                this.y += this.vy;
                //飞到停留位置
                if (this.y > this.dy) {
                    this.y = this.dy;
                    this.t = 0;
                    //进入下一状态
                    this.m = 1;
                }
                break;
            //停留	
            case 1:
                //间隔性发射子弹
                if (this.t % 3 == 0) {
                    this.nm.game.nzm.create(0, this.x, this.y, 15, 180);
                    this.nm.game.nzm.create(0, this.x, this.y, 15, 160);
                    this.nm.game.nzm.create(0, this.x, this.y, 15, 200);
                }
                this.t++;
                //图层转向 
                //10次 主循环的时间从0变到180度
                if (this.x < 240)
                    this.rotation = -180 * this.t / 10;
                else
                    this.rotation = 180 * this.t / 10;
                if (this.t >= 10) {
                    this.t = 0;
                    this.m = 2;
                }
                break;
            //向上飞
            case 2:
                this.y -= this.vy;
                //出屏，仓库清除
                if (this.y < -100) {
                    this.vis = false;
                }
                break;
        }
    };
    //检测玩家子弹是否碰撞NPC，所以用布尔值 ，需要知道玩家子弹位置，所以需要X,Y
    NPC1.prototype.isHit = function (x, y) {
        if (Math.abs(x - this.x) < this.im[0].width &&
            Math.abs(y - this.y) < this.im[0].height / 2) {
            return true;
        }
        //若没有子弹，返回false
        return false;
    };
    NPC1.prototype.dead = function () {
        for (var k = 0; k < 10; k++) {
            this.nm.game.tm.create(0, this.x + Math.random() * 100 - 50, this.y + Math.random() * 100 - 50, Math.floor(Math.random() * 5), 10, this.nm.game);
        }
    };
    return NPC1;
}(NPC));
__reflect(NPC1.prototype, "NPC1");
//# sourceMappingURL=NPC1.js.map