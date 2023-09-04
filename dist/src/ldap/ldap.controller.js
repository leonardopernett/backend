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
exports.LdapController = void 0;
const common_1 = require("@nestjs/common");
const ldap_service_1 = require("../ldap/ldap.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let LdapController = class LdapController {
    constructor(Ldap) {
        this.Ldap = Ldap;
    }
    async insertarLdap(body) {
        return await this.Ldap.insertarLdap(body.documento, body.password, body.nombre, body.correo_personal, body.genero_capturado, body.fecha_nacimiento, body.direccion, body.correo_corporativo, body.celular, body.telefono, body.tipo);
    }
    async editarLdap(body) {
        return await this.Ldap.editarLdap(body.nombre, body.correo_personal, body.genero_capturado, body.fecha_nacimiento, body.direccion, body.correo_corporativo, body.celular, body.telefono, body.id, body.tipo, body.actividad);
    }
    async mostrarLdap() {
        return await this.Ldap.mostrarLdap();
    }
    async generoLdap() {
        return await this.Ldap.generoLdap();
    }
    async tipoLdap() {
        return await this.Ldap.tipoLdap();
    }
    async buscarLdap(body) {
        return await this.Ldap.buscarLdap(body.usuario);
    }
    async validarLdap(body) {
        return await this.Ldap.validarusuario(body.usuario);
    }
    async eliminarLdap(body) {
        return await this.Ldap.eliminarLdap(body.id, body.documento);
    }
    async desbloquear(body) {
        return await this.Ldap.desbloquearusuario(body.id, body.desbloquearnew);
    }
    async ingreso(body) {
        return await this.Ldap.ingreso(body.id);
    }
    async primeringreso(body) {
        return await this.Ldap.primeringreso(body.id);
    }
    async cambiarpassword(body) {
        return await this.Ldap.cambiarpassword(body.id, body.passwordnuevo);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/insertar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "insertarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/editar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "editarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/mostrar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "mostrarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/genero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "generoLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/tipo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "tipoLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/buscar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "buscarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/validaruser'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "validarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/eliminar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "eliminarLdap", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/desbloquear'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "desbloquear", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/ingreso'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "ingreso", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/primeringreso'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "primeringreso", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/cambiarpassword'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LdapController.prototype, "cambiarpassword", null);
LdapController = __decorate([
    common_1.Controller('api/ldap'),
    __metadata("design:paramtypes", [ldap_service_1.LdapModelService])
], LdapController);
exports.LdapController = LdapController;
//# sourceMappingURL=ldap.controller.js.map