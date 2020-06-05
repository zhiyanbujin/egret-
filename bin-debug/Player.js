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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        var _this = _super.call(this) || this;
        _this.v = 30; //飞机能够允许的最大速度
        _this.game = game;
        _this.im = Main.createBitmapByName("player1_3_png");
        _this.im.anchorOffsetX = _this.im.width / 2;
        _this.im.anchorOffsetY = _this.im.height / 2;
        _this.addChild(_this.im);
        _this.x = 240;
        _this.y = 800;
        _this.isDown = false;
        _this.t = 0;
        _this.hp = 0;
        _this.bh = Main.createBitmapByName("bsxg1_1_png");
        _this.bh.anchorOffsetX = _this.bh.width / 2;
        _this.bh.anchorOffsetY = _this.bh.height / 2;
        _this.addChild(_this.bh);
        _this.bh.scaleX = _this.bh.scaleY = 0.5;
        _this.isDown = false;
        _this.x = 240;
        _this.y = 1000;
        _this.m = _this.t = 0;
        _this.bhT = 60; //60次主循环是3秒
        return _this;
        // this.v = MainData.getInstrins().playerV;
    }
    Player.prototype.touchDown = function (e) {
        this.isDown = true; //玩家点击
        this.ox = this.nx = e.stageX; //第一次点击没有上一帧位置，所以相同位置
        this.oy = this.ny = e.stageY;
        this.vx = this.vy = 0;
    };
    Player.prototype.touchMove = function (e) {
        this.nx = e.stageX; //ny跟着触笔，时刻获取最新位置。、
        this.ny = e.stageY;
    };
    Player.prototype.touchUp = function (e) {
        this.isDown = false; //触笔抬起，移动结束。
    };
    Player.prototype.update = function () {
        //保护罩时间>0。减到0 消失，图片可见性为false
        if (this.bhT > 0) {
            this.bhT--;
            if (this.bhT <= 0) {
                this.bh.visible = false;
            }
        }
        switch (this.m) {
            // 0--下方飞出
            case 0:
                this.y -= this.v;
                if (this.y <= 400) {
                    this.m = 1;
                    this.t = 0;
                }
                break;
            //1--正常游戏
            case 1:
                this.fire();
                this.movePlayer();
                break;
            // 10--胜利等待
            case 10:
                this.t++;
                if (this.t >= 20) {
                    this.t = 0;
                    this.m = 11;
                    this.vy = 0;
                }
                break;
            // 11-胜利飞出
            case 11:
                this.y -= this.vy;
                this.vy += 3;
                if (this.y < -200) {
                    //游戏胜利的切换
                    this.game.reset(this.game.level + 1);
                }
                break;
            case 20:
                this.t++;
                if (this.t >= 30) {
                    this.game.main.removeChild(this.game);
                    this.game.main.over.reset();
                    this.game.main.addChild(this.game.main.over);
                    this.game.main.canvasIndex = 30;
                }
                break;
        }
    };
    Player.prototype.movePlayer = function () {
        if (this.isDown == true) {
            var a = this.ny - this.oy;
            var b = this.nx - this.ox;
            var c = Math.sqrt(a * a + b * b);
            if (c > this.v) {
                this.vx = this.v * b / c;
                this.vy = this.v * a / c;
                this.ox += this.vx;
                this.oy += this.vy;
            }
            else {
                this.vx = b;
                this.vy = a;
                this.ox = this.nx;
                this.oy = this.ny;
            }
            //飞机跟着速度一起移动
            this.x += this.vx;
            this.y += this.vy;
            //边界检测
            if (this.x < 0)
                this.x = 0;
            else if (this.x > 480)
                this.x = 480;
            if (this.y < 0)
                this.y = 0;
            else if (this.y > 800)
                this.y = 800;
        }
        else {
            this.vx = 0;
        }
        if (this.vx < 0) {
            //向左飞：
            if (this.fi > -2)
                this.fi--;
        }
        else if (this.vx > 0) {
            if (this.fi < 2)
                this.fi++;
        }
        else {
            this.fi = 0;
        }
        this.resetFI();
    };
    Player.prototype.resetFI = function () {
        switch (Math.floor(this.fi)) {
            case 0:
                this.im.texture = RES.getRes("player1_3_png");
                break;
            case -1:
                this.im.texture = RES.getRes("player1_2_png");
                this.im.scaleX = 1;
                break;
            case -2:
                this.im.texture = RES.getRes("player1_1_png");
                this.im.scaleX = 1;
                break;
            case 1:
                this.im.texture = RES.getRes("player1_2_png");
                this.im.scaleX = -1;
                break;
            case 2:
                this.im.texture = RES.getRes("player1_1_png");
                this.im.scaleX = -1;
                break;
        }
    };
    //专用于发射子弹
    Player.prototype.fire = function () {
        //激光子弹
        // this.game.zm.create(10,this.x,this.y,0,180,this.game);
        //追踪导弹
        this.t++;
        if (this.t >= 20) {
            this.game.zm.create(20, this.x, this.y, 15, 135, this.game);
            this.game.zm.create(20, this.x, this.y, 15, -135, this.game);
            //   this.game.zm.create(20,this.x,this.y,15,45,this.game);
            //  this.game.zm.create(20,this.x,this.y,15,-45,this.game);
            this.t = 0;
        }
        // 	this.t++;
        //每4次主循环发射一颗
        // if(this.t %4 == 0){
        // 	    this.game.zm.create(1,this.x,this.y,20,0,this.game);
        // }
        if (this.t >= 15) {
            //调用create才会生成一颗子弹
            this.game.zm.create(0, this.x, this.y, 20, 0, this.game);
            this.game.zm.create(1, this.x, this.y, 20, -15, this.game);
            this.game.zm.create(0, this.x, this.y, 20, -30, this.game);
            this.game.zm.create(1, this.x, this.y, 20, 15, this.game);
            this.game.zm.create(0, this.x, this.y, 20, 30, this.game);
            for (var i = 0; i < 10; i++) {
                this.game.zm.create(2, this.x, this.y, 15, Math.random() * 360, this.game);
            }
            //      this.game.zm.create(3,this.x,this.y,10,210,this.game);
            // 	 this.game.zm.create(3,this.x,this.y,10,150,this.game);
            //         this.t = 0;
        }
    };
    Player.prototype.isHit = function (x, y) {
        //子弹与保护罩的碰撞检测	点和圆形碰撞检测
        if (this.bhT > 0) {
            // this.x this.y是圆心， 60是半径  勾股定理 ，进入圆算碰撞。
            //两点间距离公式。横坐标差的平方+纵坐标差的平方再开方 
            if ((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < 60 * 60) {
                return true;
            }
            return false;
        }
        if (this.m != 1)
            return false;
        if (Math.abs(this.x - x) < 20 && Math.abs(this.y - y) < 20) {
            //玩家死亡
            return true;
        }
        return false;
    };
    Player.prototype.dead = function () {
        //环状爆炸
        for (var i = 0; i < 10; i++) {
            var dn = Math.random() * Math.PI * 2;
            for (var j = 0; j < 15; j++) {
                this.game.tm.create(0, 
                //圆的解析式 xy为中心，（i+1）*30为半径
                this.x + (i + 1) * 30 * Math.sin(dn + Math.PI * 2 * j / 15), this.y + (i + 1) * 30 * Math.cos(dn + Math.PI * 2 * j / 15), i, Math.random() * 10 + 5, this.game);
            }
        }
        this.x = 240;
        this.y = 700;
        this.m = 20;
        this.t = 0;
        this.bhT = 60;
        this.bh.visible = true;
    };
    //通过关卡
    Player.prototype.win = function () {
        this.t = 0;
        //玩家飞出屏幕 
        this.m = 10;
    };
    Player.prototype.reset = function () {
        this.isDown = false;
        this.x = 240;
        this.y = 1000;
        this.m = this.t = 0;
        this.bhT = 60; //60次主循环是3秒
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map