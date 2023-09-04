"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const keys_1 = require("../keys");
const db_service_1 = require("../databases/db.service");
const db = new db_service_1.DbService();
const keys = new keys_1.Keys(db);
exports.client = async () => {
    const { Client } = require('@elastic/elasticsearch');
    const client = new Client({ node: process.env.ES_PUNTO_ENLACE });
    return client;
};
//# sourceMappingURL=conexion.js.map