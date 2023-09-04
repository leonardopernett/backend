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
exports.PerfilesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const permisions_model_service_1 = require("./permisions-model.service");
let PerfilesController = class PerfilesController {
    constructor(permisionsModel) {
        this.permisionsModel = permisionsModel;
    }
    async createPerfil(perfilDTO) {
        let result = await this.permisionsModel.crearPerfil(perfilDTO.nombre);
        return {
            status: 'created'
        };
    }
    async getPerfiles() {
        return await this.permisionsModel.getPerfiles();
    }
    async actualizarPerfil(idPerfil, perfilDTO) {
        return await this.permisionsModel.actualizarPerfil(idPerfil, perfilDTO.nombre);
    }
    async deletePerfil(idPerfil) {
        return await this.permisionsModel.borrarPerfil(idPerfil);
    }
    async asignarPermiso(permisoDTO, idPerfil) {
        let result = await this.permisionsModel.asignarPermiso(idPerfil, permisoDTO);
        return {
            status: 'created'
        };
    }
    async getPermisos(idPerfil) {
        return await this.permisionsModel.getPermisos(idPerfil);
    }
    async buscarusuario(body) {
        return await this.permisionsModel.getuserpermiso(body.cedula);
    }
    async buscarusuarioid(body) {
        return await this.permisionsModel.obteneridusuario(body.cedula);
    }
    async permisocategoria() {
        return await this.permisionsModel.permisoscategorias();
    }
    async permisocategoriapi() {
        return await this.permisionsModel.permisoscategoriasapi();
    }
    async permiso(body) {
        return await this.permisionsModel.permisos(body.idusuario);
    }
    async permisoapi(body) {
        return await this.permisionsModel.permisos_api(body.idusuario);
    }
    async permisoasignar(body) {
        return await this.permisionsModel.asignacionpermisos(body.idpermiso, body.idusuario, body.accion);
    }
    async permisoasignarapi(body) {
        return await this.permisionsModel.asignacionpermisosapi(body.idpermiso, body.idusuario, body.accion);
    }
    async permisoasignarol(body) {
        return await this.permisionsModel.permisoasignarol(body.idrol, body.idpermiso, body.accion);
    }
    async buscarusuarioapi(body) {
        return await this.permisionsModel.buscarusuarioapi(body.usuario);
    }
    async getroles(body) {
        return await this.permisionsModel.getRoles(body.idusuario);
    }
    async rolesasignar(body) {
        return await this.permisionsModel.asignarol(body.idusuario, body.idrol);
    }
    async obtenerol() {
        let data = await this.permisionsModel.obtenerol();
        return data[0];
    }
    async obteneruserapi() {
        let data = await this.permisionsModel.obteneruserapi();
        return data[0];
    }
    async crearol(body) {
        return await this.permisionsModel.crearol(body.rol);
    }
    async crearusuarioapi(body) {
        return await this.permisionsModel.crearusuarioapi(body.usuario, body.password, body.estado);
    }
    async editarusuarioapi(body) {
        return await this.permisionsModel.editarusuarioapi(body.id, body.usuario, body.password, body.estado);
    }
    async eliminarusuarioapi(body) {
        return await this.permisionsModel.eliminarusuarioapi(body.id);
    }
    async editarol(body) {
        return await this.permisionsModel.editarol(body.rol, body.id);
    }
    async eliminarol(body) {
        return await this.permisionsModel.eliminarol(body.id);
    }
    async obtenerpermisorol(body) {
        return await this.permisionsModel.obtenerpermisorol(body.idrol);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permisions_model_service_1.perfilDTO]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "createPerfil", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "getPerfiles", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, permisions_model_service_1.perfilDTO]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "actualizarPerfil", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "deletePerfil", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post(':id/permisos'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permisions_model_service_1.permisoDTO, String]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "asignarPermiso", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get(':id/permisos'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "getPermisos", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('buscar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "buscarusuario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('buscarid'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "buscarusuarioid", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get('permisocategoria'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisocategoria", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get('permisocategoriapi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisocategoriapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('permiso'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permiso", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('permisoapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisoapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('permisoasignar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisoasignar", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('permisoasignarapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisoasignarapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('permisoasignarol'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "permisoasignarol", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('buscarusuarioapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "buscarusuarioapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('roles'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "getroles", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('rolesasignar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "rolesasignar", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get('obtenerol'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "obtenerol", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get('obteneruserapi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "obteneruserapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('crearol'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "crearol", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('crearusuarioapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "crearusuarioapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('editarusuarioapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "editarusuarioapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('eliminarusuarioapi'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "eliminarusuarioapi", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('editarol'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "editarol", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('eliminarol'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "eliminarol", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('obtenerolpermiso'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilesController.prototype, "obtenerpermisorol", null);
PerfilesController = __decorate([
    common_1.Controller('api/perfiles'),
    __metadata("design:paramtypes", [permisions_model_service_1.PermisionsModelService])
], PerfilesController);
exports.PerfilesController = PerfilesController;
//# sourceMappingURL=perfiles.controller.js.map