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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(main) {
        var _this = _super.call(this) || this;
        _this.main = main;
        _this.bg = Main.createBitmapByName("gameBackground_jpg");
        _this.addChild(_this.bg);
        //fight
        _this.fight = Main.createBitmapByName("sl_img_png");
        _this.addChild(_this.fight);
        _this.fight.anchorOffsetX = _this.fight.width / 2;
        _this.fight.anchorOffsetY = _this.fight.height / 2;
        _this.fight.x = 240;
        _this.fight.y = 50;
        //name
        _this.na = Main.createBitmapByName("sl_name_png");
        _this.addChild(_this.na);
        _this.na.anchorOffsetX = _this.na.width / 2;
        _this.na.anchorOffsetY = _this.na.height / 2;
        _this.na.x = 240;
        _this.na.y = 100;
        //开始游戏按钮
        _this.but = Main.createBitmapByName("btn_start_png");
        _this.addChild(_this.but);
        _this.but.anchorOffsetX = _this.but.width / 2;
        _this.but.anchorOffsetY = _this.but.height / 2;
        _this.but.x = 240;
        _this.but.y = 680;
        //声音
        _this.voice = Main.createBitmapByName("btn_sound_on2_png");
        _this.addChild(_this.voice);
        _this.voice.anchorOffsetX = _this.voice.width / 2;
        _this.voice.anchorOffsetY = _this.voice.height / 2;
        _this.voice.x = 50;
        _this.voice.y = 750;
        _this.reset();
        return _this;
    }
    MainMenu.prototype.reset = function () {
        this.m = 0;
        this.t = 0;
        this.na.y = -240;
        this.fight.y = -440;
    };
    MainMenu.prototype.update = function () {
        switch (this.m) {
            case 0:
                this.t++;
                //    this.na.y = - 700 + 840 * this.t /6;
                this.fight.y = -250 + 300 * this.t / 6;
                this.na.y = -160 + 300 * this.t / 6;
                if (this.t >= 6) {
                    this.t = 0;
                    this.m = 10;
                }
                break;
            case 10:
                break;
            //离场动画
            case 20:
                this.t++;
                //  this.but.scaleY = this.but.scaleX = 1 -  1 *this.t/5;
                //   this.na.scaleY = this.na.scaleX =1 - 1*this.t/5;
                this.fight.y = 200 - 800 * this.t / 5;
                this.na.y = 220 - 800 * this.t / 5;
                if (this.t >= 5) {
                    // }
                    this.main.removeChild(this); //把自身移出去
                    this.main.game.reset(0); // 0 是关卡
                    this.main.addChild(this.main.game); //吧game添加进来
                    this.main.canvasIndex = 20;
                }
                break;
        }
    };
    MainMenu.prototype.touchDown = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.main.game == null)) return [3 /*break*/, 2];
                        //把loading界面加载到场景中
                        this.stage.addChild(this.main.loadingView);
                        //读取资源
                        return [4 /*yield*/, RES.loadGroup("game", 0, this.main.loadingView)];
                    case 1:
                        //读取资源
                        _a.sent();
                        //移除界面
                        this.stage.removeChild(this.main.loadingView);
                        //加载完成再去构造game界面
                        this.main.game = new MainGame(this.main);
                        _a.label = 2;
                    case 2:
                        this.main.removeChild(this);
                        this.main.game.reset(0); // 0 是关卡
                        this.main.addChild(this.main.game);
                        this.main.canvasIndex = 20;
                        return [2 /*return*/];
                }
            });
        });
    };
    MainMenu.prototype.touchMove = function (e) {
    };
    MainMenu.prototype.touchUp = function (e) {
    };
    return MainMenu;
}(egret.Sprite));
__reflect(MainMenu.prototype, "MainMenu");
//# sourceMappingURL=MainMenu.js.map