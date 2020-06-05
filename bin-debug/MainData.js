var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainData = (function () {
    function MainData() {
        var data = RES.getRes("data_json");
        this.playerV = data["playV"];
        this.zdV = data["zdV"];
    }
    MainData.getInstrins = function () {
        if (!MainData.my) {
            MainData.my = new MainData();
        }
        return MainData.my;
    };
    return MainData;
}());
__reflect(MainData.prototype, "MainData");
//# sourceMappingURL=MainData.js.map