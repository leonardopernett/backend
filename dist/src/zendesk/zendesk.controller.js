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
exports.ZendeskController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const zendesk_model_service_1 = require("../zendesk/zendesk-model.service");
let ZendeskController = class ZendeskController {
    constructor(zendesk) {
        this.zendesk = zendesk;
    }
    getArticulo() {
        return this.zendesk.getarticulozendesk();
    }
    changeArticulo(articulo) {
        return this.zendesk.changearticulozendesk(articulo);
    }
    async cargardata(res) {
        await this.zendesk.guardarzendesk();
        return res.status(200).json({ message: 'articulo de zendesk insertado' });
    }
    async updatetotal(res) {
        await this.zendesk.actualizarzendesk();
        return res.status(200).json({ message: 'articulo de zendesk actualizado' });
    }
    async borrar(res) {
        await this.zendesk.borrarzendesk();
        return res.status(200).json({ message: 'articulo de zendesk borrdado' });
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('articulos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZendeskController.prototype, "getArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put('changearticulo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZendeskController.prototype, "changeArticulo", null);
__decorate([
    common_1.Get('insertar'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZendeskController.prototype, "cargardata", null);
__decorate([
    common_1.Get('actualizartotal'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZendeskController.prototype, "updatetotal", null);
__decorate([
    common_1.Get('borrar'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZendeskController.prototype, "borrar", null);
ZendeskController = __decorate([
    common_1.Controller('api/zendesk'),
    __metadata("design:paramtypes", [zendesk_model_service_1.ZendeskModelService])
], ZendeskController);
exports.ZendeskController = ZendeskController;
//# sourceMappingURL=zendesk.controller.js.map