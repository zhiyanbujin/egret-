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
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame(main) {
        var _this = _super.call(this) || this;
        _this.main = main;
        _this.level = 0;
        _this.bg = new BG(_this);
        _this.player = new Player(_this);
        //              x,y, 速度，角度
        _this.zm = new ZDManager(_this);
        _this.nm = new NPCManager(_this);
        _this.nzm = new NZDManager(_this);
        _this.tm = new TXManager(_this);
        _this.addChild(_this.bg);
        _this.addChild(_this.nm); //注意：nm要放在所有场景除背景外的最底层。
        _this.addChild(_this.zm);
        //因为是躲NPC子弹，所以放在玩家上面，可以很容易被看到。
        _this.addChild(_this.player);
        _this.addChild(_this.nzm);
        _this.addChild(_this.tm);
        _this.score = 0;
        _this.st = new egret.TextField();
        _this.addChild(_this.st);
        _this.st.x = _this.st.y = 50;
        _this.st.size = 30;
        _this.t = 0;
        return _this;
    }
    MainGame.prototype.update = function () {
        this.bg.update();
        this.player.update();
        this.zm.update();
        this.nm.update();
        this.nzm.update();
        this.tm.update();
        this.score += 2;
        this.st.text = "分数" + this.score;
    };
    MainGame.prototype.touchDown = function (e) {
        this.player.touchDown(e);
    };
    MainGame.prototype.touchMove = function (e) {
        this.player.touchMove(e);
    };
    MainGame.prototype.touchUp = function (e) {
        this.player.touchUp(e);
    };
    MainGame.prototype.reset = function (level) {
        this.level = level;
        this.player.reset();
        this.bg.reset();
        this.nm.reset();
        this.nzm.reset();
    };
    return MainGame;
}(egret.Sprite));
__reflect(MainGame.prototype, "MainGame");
//# sourceMappingURL=MainGame.js.map