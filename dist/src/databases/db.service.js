"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let DbService = class DbService {
    constructor() {
        this.nikcleanPoolConection = mysql.createPool({
            host: process.env.NIK_DB_HOST,
            user: process.env.NIK_DB_USER,
            password: process.env.NIK_DB_PASS,
            database: 'nik'
        });
        this.nikPoolConection = mysql.createPool({
            host: process.env.NIK_DB_HOST,
            user: process.env.NIK_DB_USER,
            password: process.env.NIK_DB_PASS,
            database: 'nik'
        });
        this.nikSlavePoolConection = mysql.createPool({
            host: process.env.NIK_DB_HOST,
            user: process.env.NIK_DB_USER,
            password: process.env.NIK_DB_PASS,
            database: 'nik'
        });
        this.jarvisPoolConection = mysql.createPool({
            host: process.env.JARVIS_HOST,
            user: process.env.JARVIS_USER,
            database: 'jarvis',
            password: process.env.JARVIS_PASS
        });
        this.NIK = async (sql, values) => {
            try {
                var [rows] = await this.nikPoolConection.query(sql, values);
                if (sql.toLowerCase().includes('call')) {
                    return rows[0];
                }
                else {
                    return rows;
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        this.JARVIS = async (sql, values) => {
            try {
                var [rows] = values ? await this.jarvisPoolConection.query(sql, values) : await this.jarvisPoolConection.query(sql);
                if (sql.toLowerCase().includes('call')) {
                    return rows[0];
                }
                else {
                    return rows;
                }
            }
            catch (err) {
                console.log(err);
                throw new common_1.HttpException({
                    "error": `error code: DBerror`,
                    "message": "internal_server_error"
                }, 500);
            }
        };
        this.NIKSLAVE = async (sql, values) => {
            try {
                var [rows] = await this.nikSlavePoolConection.query(sql, values);
                if (sql.toLowerCase().includes('call')) {
                    return rows[0];
                }
                else {
                    return rows;
                }
            }
            catch (err) {
                console.log(err);
            }
        };
    }
};
DbService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map