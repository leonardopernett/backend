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
exports.VerifyGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let VerifyGuard = class VerifyGuard {
    constructor() { }
    generarcabacera(payload) {
        return jsonwebtoken_1.verify(payload, "AXJDKRIOTP.,SJ,.@AS.,dmf@cf1283874", function (error, respuesta) {
            if (error) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    canActivate(context) {
        let ctx = context.switchToHttp();
        let req = ctx.getRequest();
        let data = this.generarcabacera(req.headers.authorization);
        if (data) {
            return true;
        }
        else {
            return false;
        }
    }
};
VerifyGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], VerifyGuard);
exports.VerifyGuard = VerifyGuard;
//# sourceMappingURL=verifytoken.guard.js.map