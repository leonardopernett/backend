"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomatizacionModule = void 0;
const common_1 = require("@nestjs/common");
const automatizacion_controller_1 = require("./automatizacion.controller");
const automatizacion_model_service_1 = require("./automatizacion-model.service");
let AutomatizacionModule = class AutomatizacionModule {
};
AutomatizacionModule = __decorate([
    common_1.Module({
        controllers: [
            automatizacion_controller_1.AutomatizacionController
        ],
        providers: [
            automatizacion_model_service_1.AutomatizacionModelService,
        ],
        exports: [
            automatizacion_model_service_1.AutomatizacionModelService
        ],
        imports: []
    })
], AutomatizacionModule);
exports.AutomatizacionModule = AutomatizacionModule;
//# sourceMappingURL=automatizacion.module.js.map