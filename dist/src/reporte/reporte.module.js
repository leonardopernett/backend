"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesModule = void 0;
const common_1 = require("@nestjs/common");
const reporte_controller_1 = require("../reporte/reporte.controller");
const reporte_model_service_1 = require("../reporte/reporte-model.service");
const AD = require('activedirectory2').promiseWrapper;
let ReportesModule = class ReportesModule {
};
ReportesModule = __decorate([
    common_1.Module({
        controllers: [
            reporte_controller_1.ReportsController
        ],
        providers: [
            reporte_model_service_1.ReportsModelService,
            {
                provide: 'activeDirectory',
                useFactory: () => {
                    const config = {
                        url: 'ldap://172.20.1.220',
                        baseDN: 'dc=multienlace,dc=com,dc=co',
                        username: process.env.BIND_DN,
                        password: process.env.BIND_CREDENTIALS,
                    };
                    return new AD(config);
                }
            }
        ],
        exports: [
            reporte_model_service_1.ReportsModelService
        ],
        imports: []
    })
], ReportesModule);
exports.ReportesModule = ReportesModule;
//# sourceMappingURL=reporte.module.js.map