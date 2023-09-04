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
exports.MigracionController = void 0;
const common_1 = require("@nestjs/common");
const migracion_model_service_1 = require("./migracion-model.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let MigracionController = class MigracionController {
    constructor(migracionModel) {
        this.migracionModel = migracionModel;
    }
    migrarUsuarios(from, size) {
        console.log(size);
        return this.migracionModel.migrateUsers(from, size);
    }
    migrarUsuariosBases(from, size) {
        return this.migracionModel.migrateUserBases(from, size);
    }
    migrarCategorias(from, size) {
        return this.migracionModel.migrarCategorias(from, size);
    }
    migrarArticulo(from, size) {
        return this.migracionModel.migrarArticulos(from, size);
    }
    migrarVistasArticulo(from, size) {
        return this.migracionModel.migrarVistasArticulo(from, size);
    }
    migrarComentariosArticulo(from, size) {
        return this.migracionModel.migrarComentario(from, size);
    }
    migrarFavoritos(from, size) {
        console.log('prueba');
        return this.migracionModel.migrarFavoritos(from, size);
    }
    migrarMeGusta(from, size) {
        return this.migracionModel.migrarMeGusta(from, size);
    }
    arreglarArticulos(from, size) {
        return this.migracionModel.agregarArticulosEs(from, size);
    }
    arreglarCategorias(from, size) {
        return this.migracionModel.arreglarCategorias(from, size);
    }
    arreglarUsuarios(from, size) {
        return this.migracionModel.arreglarUsuarios(from, size);
    }
    buscararticulos(from, size) {
        return this.migracionModel.buscararticulos(from, size);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('usuarios'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarUsuarios", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('usuariosbases'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarUsuariosBases", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('categorias'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarCategorias", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('articulos'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('vistas'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarVistasArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('comentarios'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarComentariosArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('favoritos'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarFavoritos", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('megusta'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "migrarMeGusta", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('arreglarArticulos'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "arreglarArticulos", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('arreglarCategorias'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "arreglarCategorias", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('arreglarUsuarios'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "arreglarUsuarios", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('buscararticulos'),
    __param(0, common_1.Query('from')),
    __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MigracionController.prototype, "buscararticulos", null);
MigracionController = __decorate([
    common_1.Controller('api/migrar'),
    __metadata("design:paramtypes", [migracion_model_service_1.MigracionModelService])
], MigracionController);
exports.MigracionController = MigracionController;
//# sourceMappingURL=migracion.controller.js.map