"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfEportModule = void 0;
const common_1 = require("@nestjs/common");
const databases_module_1 = require("../../databases/databases.module");
const articulos_module_1 = require("../articulos.module");
const pdf_export_controller_1 = require("./pdf-export.controller");
const pdf_export_service_1 = require("./pdf-export.service");
let PdfEportModule = class PdfEportModule {
};
PdfEportModule = __decorate([
    common_1.Module({
        imports: [databases_module_1.DatabasesModule, articulos_module_1.ArticulosModule],
        controllers: [pdf_export_controller_1.PdfExportController],
        providers: [pdf_export_service_1.PdfExportService],
    })
], PdfEportModule);
exports.PdfEportModule = PdfEportModule;
//# sourceMappingURL=pdf-eport.module.js.map