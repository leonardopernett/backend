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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetController = void 0;
const common_1 = require("@nestjs/common");
const reset_service_1 = require("../reset/reset.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let ResetController = class ResetController {
    constructor(Reset) {
        this.Reset = Reset;
    }
    async generarToken(body) {
        return await this.Reset.generarToken(body.email);
    }
    async validarToken(body) {
        return await this.Reset.validartoken(body.token);
    }
    async resetPass(body) {
        let data = await this.Reset.validartoken(body.token);
        if (data != 0) {
            return await this.Reset.resetPassword(body.email, body.passwordnuevo);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResetController.prototype, "generarToken", null);
__decorate([
    common_1.Post('/validar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResetController.prototype, "validarToken", null);
__decorate([
    common_1.Post('/pass'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResetController.prototype, "resetPass", null);
ResetController = __decorate([
    common_1.Controller('api/reset'),
    __metadata("design:paramtypes", [reset_service_1.ResetModelService])
], ResetController);
exports.ResetController = ResetController;
//# sourceMappingURL=reset.controller.js.map