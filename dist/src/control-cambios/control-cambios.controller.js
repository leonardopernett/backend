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
exports.ControlCambiosController = void 0;
const common_1 = require("@nestjs/common");
const control_cambios_service_1 = require("../control-cambios/control-cambios.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let ControlCambiosController = class ControlCambiosController {
    constructor(control) {
        this.control = control;
    }
    mostrarControlcambio(body) {
        return this.control.mostrarcontroldecambio(body.id_articulo);
    }
    mostrarCambio(body) {
        return this.control.mostrarcambio(body.id_cambio);
    }
    selectCambio(body) {
        return this.control.cambioselect(body.id_articulo);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/mostrarcontrolcambio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ControlCambiosController.prototype, "mostrarControlcambio", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/mostrarcambio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ControlCambiosController.prototype, "mostrarCambio", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/selectcambio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ControlCambiosController.prototype, "selectCambio", null);
ControlCambiosController = __decorate([
    common_1.Controller('api/controlcambios'),
    __metadata("design:paramtypes", [control_cambios_service_1.ControlCambiosModelService])
], ControlCambiosController);
exports.ControlCambiosController = ControlCambiosController;
//# sourceMappingURL=control-cambios.controller.js.map