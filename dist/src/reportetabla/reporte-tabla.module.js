"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesTableModule = void 0;
const common_1 = require("@nestjs/common");
const reporte_tabla_controller_1 = require("../reportetabla/reporte-tabla.controller");
const reporte_tabla_model_service_1 = require("../reportetabla/reporte-tabla-model.service");
let ReportesTableModule = class ReportesTableModule {
};
ReportesTableModule = __decorate([
    common_1.Module({
        controllers: [
            reporte_tabla_controller_1.ReportsTableController
        ],
        providers: [
            reporte_tabla_model_service_1.ReportsTableModelService
        ],
        imports: []
    })
], ReportesTableModule);
exports.ReportesTableModule = ReportesTableModule;
//# sourceMappingURL=reporte-tabla.module.js.map