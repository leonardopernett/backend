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
exports.PdfExportController = void 0;
const common_1 = require("@nestjs/common");
const pdf_export_service_1 = require("./pdf-export.service");
let PdfExportController = class PdfExportController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    async generatePdf(id, res) {
        const pdfBytes = await this.pdfService.generatePdf(id);
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', `attachment; filename=output.pdf`);
        res.send(pdfBytes);
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PdfExportController.prototype, "generatePdf", null);
PdfExportController = __decorate([
    common_1.Controller('api/articles/pdf/'),
    __metadata("design:paramtypes", [pdf_export_service_1.PdfExportService])
], PdfExportController);
exports.PdfExportController = PdfExportController;
//# sourceMappingURL=pdf-export.controller.js.map