"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisosModule = void 0;
const common_1 = require("@nestjs/common");
const perfiles_controller_1 = require("./perfiles.controller");
const permisos_controller_1 = require("./permisos.controller");
const permisions_model_service_1 = require("./permisions-model.service");
let PermisosModule = class PermisosModule {
};
PermisosModule = __decorate([
    common_1.Module({
        controllers: [
            perfiles_controller_1.PerfilesController,
            permisos_controller_1.PermisosController
        ],
        providers: [
            permisions_model_service_1.PermisionsModelService
        ],
        exports: [
            permisions_model_service_1.PermisionsModelService
        ]
    })
], PermisosModule);
exports.PermisosModule = PermisosModule;
//# sourceMappingURL=permisos.module.js.map