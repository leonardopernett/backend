"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargosModule = void 0;
const common_1 = require("@nestjs/common");
const coordinadores_controller_1 = require("./coordinadores.controller");
const cargos_model_service_1 = require("./cargos-model.service");
const clientes_controller_1 = require("./clientes.controller");
const directores_controller_1 = require("./directores.controller");
const gerentes_controller_1 = require("./gerentes.controller");
let cargosModule = class cargosModule {
};
cargosModule = __decorate([
    common_1.Module({
        controllers: [
            coordinadores_controller_1.CoordinadoresController,
            clientes_controller_1.ClientesController,
            directores_controller_1.DirectoresController,
            gerentes_controller_1.GerentesController
        ],
        providers: [
            cargos_model_service_1.CargosModelService
        ],
        exports: [
            cargos_model_service_1.CargosModelService
        ]
    })
], cargosModule);
exports.cargosModule = cargosModule;
//# sourceMappingURL=cargos.module.js.map