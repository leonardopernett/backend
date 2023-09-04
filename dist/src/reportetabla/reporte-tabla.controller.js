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
exports.ReportsTableController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const reporte_tabla_model_service_1 = require("./reporte-tabla-model.service");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer = require("multer");
const S3 = require("aws-sdk/clients/s3");
const excelToJson = require('convert-excel-to-json');
const fs = require("fs");
const fs_extra_1 = require("fs-extra");
let ReportsTableController = class ReportsTableController {
    constructor(Reporte) {
        this.Reporte = Reporte;
        this.s3Client = new S3({
            accessKeyId: process.env.ACCESS_KEY_ID_REPO,
            secretAccessKey: process.env.ACCESS_KEY_REPO,
            region: 'us-east-1',
            sslEnabled: false
        });
    }
    async uploadFile(image, body, req, res) {
        this.Reporte.borrarpermisos().then(data => {
            const result = excelToJson({
                sourceFile: './public/uploads/' + image.filename
            });
            result.Hoja1.forEach(data => {
                this.Reporte.guardarpermisos(data.A, data.B);
            });
        });
        let parametro = {
            Bucket: process.env.BUCKET_REPOSITORIO,
            Key: 'folder/' + image.filename,
            Body: fs.createReadStream('./public/uploads/' + image.filename),
            ACL: 'public-read'
        };
        let uploadResul = await this.s3Client.upload(parametro).promise();
        const name = image.originalname.split('.')[0];
        let param = {
            user: body.username,
            documento: body.documento,
            url: `${process.env.BUCKET_URL}/folder/${image.filename}`
        };
        await this.Reporte.guardartable(param);
        await fs_extra_1.unlink(image.path);
        return res.json({ message: 'documento guardado' });
    }
    downloadFile() {
        return this.Reporte.obtenerpermisos();
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        storage: multer.diskStorage({
            destination: './public/uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + path_1.extname(file.originalname));
            }
        })
    })),
    common_1.Post('/upload'),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()), __param(2, common_1.Req()), __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsTableController.prototype, "uploadFile", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/download'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsTableController.prototype, "downloadFile", null);
ReportsTableController = __decorate([
    common_1.Controller('api/reportable'),
    __metadata("design:paramtypes", [reporte_tabla_model_service_1.ReportsTableModelService])
], ReportsTableController);
exports.ReportsTableController = ReportsTableController;
//# sourceMappingURL=reporte-tabla.controller.js.map