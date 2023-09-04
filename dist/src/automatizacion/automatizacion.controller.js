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
exports.AutomatizacionController = void 0;
const common_1 = require("@nestjs/common");
const automatizacion_model_service_1 = require("../automatizacion/automatizacion-model.service");
const autorization_guard_1 = require("../jwt/autorization.guard");
let AutomatizacionController = class AutomatizacionController {
    constructor(Automatizacion) {
        this.Automatizacion = Automatizacion;
    }
    async consulta() {
        this.Automatizacion.pcrc();
    }
    async consultados() {
        this.Automatizacion.cliente();
    }
    async consolidar() {
        this.Automatizacion.consolidar();
    }
    async depurarVista(dias, res) {
        const resp = await this.Automatizacion.depurarVista(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarBusqueda(dias, res) {
        const resp = await this.Automatizacion.depurarBusqueda(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarCambioArticulo(dias, res) {
        const resp = await this.Automatizacion.depurarCambioArticulo(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarComentario(dias, res) {
        const resp = await this.Automatizacion.depurarComentario(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarSesion(dias, res) {
        const resp = await this.Automatizacion.depurarSesion(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarTipoEvento(dias, res) {
        const resp = await this.Automatizacion.depurarTipoEvento(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarJwt(dias, res) {
        const resp = await this.Automatizacion.depurarJwt(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarUsuario(dias) {
        this.Automatizacion.depurarUsuario(dias);
    }
    async depurarBackupBusqueda(dias, res) {
        const resp = await this.Automatizacion.depurarBackupBusqueda(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarBackupCambioArticulo(dias, res) {
        const resp = await this.Automatizacion.depurarBackupCambioArticulo(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarBackupSesion(dias, res) {
        const resp = await this.Automatizacion.depurarBackupSesion(dias);
        return res.json({
            mensaje: resp,
            dias
        });
    }
    async depurarVistaMes(inicial, final, res) {
        const resp = await this.Automatizacion.depurarVistaMes(inicial, final);
        return res.json({
            mensaje: resp
        });
    }
};
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('pcrc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "consulta", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('cliente'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "consultados", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('consolidar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "consolidar", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_vista/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarVista", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_busqueda/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarBusqueda", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_cambio/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarCambioArticulo", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_comentario/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarComentario", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_sesion/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarSesion", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_tipo_evento/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarTipoEvento", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_jwt/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarJwt", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_usuario/:dias'),
    __param(0, common_1.Param('dias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarUsuario", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_backup_busqueda/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarBackupBusqueda", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_backup_cambio_articulo/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarBackupCambioArticulo", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('depurar_backup_sesion/:dias'),
    __param(0, common_1.Param('dias')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarBackupSesion", null);
__decorate([
    common_1.Get('depurar_vista_mes/:fechainicial/:fechafinal'),
    __param(0, common_1.Param('fechainicial')),
    __param(1, common_1.Param('fechafinal')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AutomatizacionController.prototype, "depurarVistaMes", null);
AutomatizacionController = __decorate([
    common_1.Controller('api/automatizacion'),
    __metadata("design:paramtypes", [automatizacion_model_service_1.AutomatizacionModelService])
], AutomatizacionController);
exports.AutomatizacionController = AutomatizacionController;
//# sourceMappingURL=automatizacion.controller.js.map