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
exports.AutorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
var token = require('basic-auth-token');
var atob = require('atob');
var CryptoJS = require("crypto-js");
let AutorizationGuard = class AutorizationGuard {
    constructor(db) {
        this.db = db;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.headers.authorization === undefined) {
            return false;
        }
        let token = request.headers.authorization;
        let tokenS = token.split(" ", 2);
        let tokendes = tokenS[1];
        let bin = atob(tokendes);
        let bindes = bin.split(":", 2);
        let usuario = bindes[0];
        let password = bindes[1];
        let data = this.db.nikcleanPoolConection.query('SELECT * FROM api_users WHERE usuario=?', [usuario]);
        return data.then((data) => {
            if (data[0].length) {
                if (data[0][0].estado === 1) {
                    var bytes = CryptoJS.AES.decrypt(data[0][0].password, 'abc');
                    let passdec = bytes.toString(CryptoJS.enc.Utf8);
                    if (passdec === password) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
};
AutorizationGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], AutorizationGuard);
exports.AutorizationGuard = AutorizationGuard;
//# sourceMappingURL=autorization.guard.js.map