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
exports.KeysController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const keys_service_1 = require("./keys.service");
var CryptoJS = require("crypto-js");
let KeysController = class KeysController {
    constructor(key) {
        this.key = key;
    }
    async postNews(body) {
        var ciphertext = CryptoJS.AES.encrypt(body.valor, 'abc').toString();
        await this.key.keysave(body.nombre, ciphertext, body.descripcion);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('save'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "postNews", null);
KeysController = __decorate([
    common_1.Controller('api/key'),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], KeysController);
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map