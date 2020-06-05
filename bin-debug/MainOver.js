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
var MainOver = (function (_super) {
    __extends(MainOver, _super);
    function MainOver(main) {
        var _this = _super.call(this) || this;
        _this.ph = []; //存入数值   
        _this.l = 50; //记录的总名次
        _this.main = main;
        _this.bg = Main.createBitmapByName("gameBackground_jpg");
        _this.addChild(_this.bg);
        for (var i = 0; i < _this.l; i++) {
            _this.ph[i] = 0;
        }
        _this.st = new egret.TextField();
        _this.addChild(_this.st);
        _this.st.x = _this.st.y = 50;
        _this.st.size = 30;
        _this.st2 = new egret.TextField();
        _this.addChild(_this.st2);
        _this.st2.x = 200;
        _this.st2.y = 500;
        _this.st2.size = 30;
        var rect = new egret.Shape();
        _this.addChild(rect);
        rect.graphics.beginFill(0xffffff);
        rect.graphics.drawRect(0, 100, 480, 500);
        rect.graphics.endFill();
        // let im = Main.createBitmapByName("help_im_png");
        // this.addChild(im);
        _this.st.mask = rect;
        _this.isDown = false;
        _this.vy = 0;
        return _this;
    }
    MainOver.prototype.update = function () {
        if (this.isDown == true) {
            this.vy = this.ny - this.oy;
            this.oy = this.ny;
            this.st.y += this.vy;
        }
        else if (Math.abs(this.vy) > 0) {
            this.vy *= 0.6; //速度逐渐变慢   0.6是阻尼值0~1之间
            this.st.y += this.vy;
            if (Math.abs(this.vy) < 1) {
                this.vy = 0;
            }
        }
    };
    MainOver.prototype.touchDown = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // this.main.removeChild(this);
                // this.main.game.reset(0);
                // this.main.addChild(this.main.game);
                // this.main.canvasIndex = 20;
                // this.main.game.score = 0 ;
                this.isDown = true;
                this.oy = this.ny = e.stageY; //当前和上一次位置都等于触笔
                return [2 /*return*/];
            });
        });
    };
    MainOver.prototype.touchMove = function (e) {
        this.ny = e.stageY;
    };
    MainOver.prototype.touchUp = function (e) {
        this.isDown = false;
    };
    MainOver.prototype.reset = function () {
        this.num = -1;
        for (var i = 0; i < this.l; i++) {
            if (this.main.game.score >= this.ph[i]) {
                //j是最后一个成绩
                for (var j = this.l - 1; j > i; j--) {
                    this.ph[j] = this.ph[j - 1];
                }
                this.ph[i] = this.main.game.score;
                this.num = i;
                break;
            }
        }
        this.st.text = "";
        for (var i = 0; i < this.l; i++) {
            this.st.text += "第" + (i + 1) + "名 :" + this.ph[i] + "\n"; //因为i是从0 开始 所以i+1;
        }
        this.st2.text = "我的成绩：" + this.main.game.score + "";
    };
    return MainOver;
}(egret.Sprite));
__reflect(MainOver.prototype, "MainOver");
//# sourceMappingURL=MainOver.js.map