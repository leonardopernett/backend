"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = void 0;
var CryptoJS = require("crypto-js");
class Keys {
    constructor(DB) {
        this.DB = DB;
    }
    async elastic() {
        let [elastic] = await this.DB.nikcleanPoolConection.query("SELECT valor FROM llaves WHERE nombre='ES_PUNTO_ENLACE'");
        var bytes = CryptoJS.AES.decrypt(elastic[0].valor, 'abc');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
}
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map