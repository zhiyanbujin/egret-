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
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(nm) {
        var _this = _super.call(this) || this;
        _this.nm = nm;
        _this.vis = true;
        return _this;
    }
    return NPC;
}(egret.Sprite));
__reflect(NPC.prototype, "NPC");
//# sourceMappingURL=NPC.js.map