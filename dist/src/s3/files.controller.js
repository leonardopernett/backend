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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const s3_bucket_service_1 = require("./s3-bucket.service");
const db_service_1 = require("../databases/db.service");
let FilesController = class FilesController {
    constructor(S3BucketService, db) {
        this.S3BucketService = S3BucketService;
        this.db = db;
    }
    getFile(idArticle, fileName, res) {
        let stream = this.S3BucketService.getFile(idArticle, fileName);
        stream.on('error', function (err) {
            res.status(500).json({ error: "Error -> " + err });
        }).pipe(res);
    }
    async deleteFileAux(idArticle, fileName) {
        await Promise.all([
            this.S3BucketService.deleteFile(idArticle, fileName),
            this.db.NIK(`call borrar_adjunto(?,?)`, [idArticle, fileName])
        ]);
    }
};
__decorate([
    common_1.Get(':articuloId/:fileName'),
    __param(0, common_1.Param('articuloId')),
    __param(1, common_1.Param('fileName')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFile", null);
__decorate([
    common_1.Delete(':idArticle/:fileName'),
    __param(0, common_1.Param('idArticle')),
    __param(1, common_1.Param('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteFileAux", null);
FilesController = __decorate([
    common_1.Controller('files'),
    __metadata("design:paramtypes", [s3_bucket_service_1.S3BucketService,
        db_service_1.DbService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map