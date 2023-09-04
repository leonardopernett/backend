"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = void 0;
const db_service_1 = require("./databases/db.service");
var CryptoJS = require("crypto-js");
const db = new db_service_1.DbService();
exports.getKey = async () => {
    let data = [];
    const result = await db.NIK('select * from llaves');
    result.forEach(item => {
        data.push(item);
    });
    return data;
};
exports.default = {
    getKey: exports.getKey
};
//# sourceMappingURL=constant.js.map