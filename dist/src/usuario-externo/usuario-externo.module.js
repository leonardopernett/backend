"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioExternoModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_externo_service_1 = require("./usuario-externo.service");
const usuario_externo_controller_1 = require("./usuario-externo.controller");
let UsuarioExternoModule = class UsuarioExternoModule {
};
UsuarioExternoModule = __decorate([
    common_1.Module({
        controllers: [
            usuario_externo_controller_1.UsuarioExternoController
        ],
        providers: [
            usuario_externo_service_1.UsuarioExternoService
        ],
        exports: [
            usuario_externo_service_1.UsuarioExternoService
        ],
        imports: []
    })
], UsuarioExternoModule);
exports.UsuarioExternoModule = UsuarioExternoModule;
//# sourceMappingURL=usuario-externo.module.js.map