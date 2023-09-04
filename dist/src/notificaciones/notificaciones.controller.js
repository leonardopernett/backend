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
exports.NotificacionesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const notificaciones_service_1 = require("./notificaciones.service");
const autorization_guard_1 = require("../jwt/autorization.guard");
let NotificacionesController = class NotificacionesController {
    constructor(notificaciones) {
        this.notificaciones = notificaciones;
    }
    async getDepurarNotificaciones(res) {
        await this.notificaciones.getDepuracion();
        return res.status(200).json({ message: 'depurarcion exitosa' });
    }
    async getNotificaciones(body) {
        const { documento } = body;
        const result = await this.notificaciones.getNotificaciones(documento);
        return result;
    }
    async getNotificacionesLeidas(body) {
        const { documento, id_notificacion } = body;
        const result = await this.notificaciones.getNotificacionesLeidas(documento, id_notificacion);
        return result;
    }
    async getNotificacionesNoLeidas() {
    }
    async getNotificacionesById(documento) {
        return this.notificaciones.getById(documento);
    }
    async getNotificacionesById2(documento) {
        return this.notificaciones.getById(documento);
    }
    async getNotificationSaveArticle(body) {
        return await this.notificaciones.getCreateArticle(body);
    }
    async getNotificationUpdateArticle(body) {
        return await this.notificaciones.getUpdateArticle(body);
    }
    async getNotificationResponseComment(body) {
        return await this.notificaciones.getComment(body);
    }
    async getNotificationActive() {
        const result = await this.notificaciones.getActive();
        return result[0];
    }
    async getNotificationDelete(id, res) {
        await this.notificaciones.deleteNotificaciones(id);
        return res.json({ message: 'eliminado notificaciones' });
    }
};
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Post('depurar'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getDepurarNotificaciones", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificaciones", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/leidas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificacionesLeidas", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/no-leidas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificacionesNoLeidas", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificacionesById", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('notify/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificacionesById2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/create-article'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificationSaveArticle", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/update-article'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificationUpdateArticle", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/comment-response'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificationResponseComment", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificationActive", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('delete/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificacionesController.prototype, "getNotificationDelete", null);
NotificacionesController = __decorate([
    common_1.Controller('/api/notificaciones'),
    __metadata("design:paramtypes", [notificaciones_service_1.NotificacionesServices])
], NotificacionesController);
exports.NotificacionesController = NotificacionesController;
//# sourceMappingURL=notificaciones.controller.js.map