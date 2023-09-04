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
exports.RepositorioController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const user_decorator_1 = require("../user.decorator");
const repositorio_services_1 = require("./repositorio.services");
const S3 = require("aws-sdk/clients/s3");
const fs_extra_1 = require("fs-extra");
const fs = require("fs");
const jwt_guard_1 = require("../jwt/jwt.guard");
let RepositorioController = class RepositorioController {
    constructor(respositoryService) {
        this.respositoryService = respositoryService;
        this.s3Client = new S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.ACCESS_KEY,
            region: 'us-east-1',
            sslEnabled: false
        });
    }
    async uploadFile(body, image, res, idArticulo, User) {
        let parametro = {
            Bucket: process.env.BUCKET_NAME,
            Key: 'folder/' + image.filename,
            Body: fs.createReadStream('./dist/uploads/' + image.filename),
            ACL: 'public-read'
        };
        let uploadResul = await this.s3Client.upload(parametro).promise();
        const name = image.originalname.split('.')[0];
        let param = {
            nombre_archivo: name,
            extension: path_1.extname(image.originalname),
            peso: image.size,
            documento_creador: body.username,
            s3_name: image.filename,
            id_articulo: idArticulo,
            url: `${process.env.BUCKET_URL}/folder/${image.filename}`
        };
        await this.respositoryService.saveReposit(param);
        await fs_extra_1.unlink(image.path);
        return res.json({ message: 'documento guardado' });
    }
    async getRepositorioByArticuloId(res, IdArticulo) {
        const documents = await this.respositoryService.getRePositoryId(IdArticulo);
        return res.json(documents);
    }
    getallFile(body, IdArticulo) {
        const params = {
            Bucket: process.env.BUCKET_REPOSITORIO,
            Key: 'folder/' + body.filename,
        };
        this.s3Client.getObject(params, function (err, data) {
            if (err) {
                console.log(err);
            }
            fs.writeFileSync('./public/' + body.filename, data.Body);
            return body;
        });
    }
    async deleteBorradorDocumento(id, res, User, body) {
        await this.respositoryService.deleteBorrador(id, body.username);
        return res.json({ message: 'documento eliminado' });
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        storage: multer_1.diskStorage({
            destination: './dist/uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + path_1.extname(file.originalname));
            }
        })
    })),
    common_1.Post(':idArticulo'),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Res()), __param(3, common_1.Param('idArticulo')), __param(4, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RepositorioController.prototype, "uploadFile", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':IdArticulo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('IdArticulo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepositorioController.prototype, "getRepositorioByArticuloId", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('file/:IdArticulo'),
    __param(0, common_1.Body()), __param(1, common_1.Param('IdArticulo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RepositorioController.prototype, "getallFile", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()), __param(2, user_decorator_1.User()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RepositorioController.prototype, "deleteBorradorDocumento", null);
RepositorioController = __decorate([
    common_1.Controller('api/repositorio'),
    __metadata("design:paramtypes", [repositorio_services_1.RepositorioServices])
], RepositorioController);
exports.RepositorioController = RepositorioController;
//# sourceMappingURL=respoitorio.controller.js.map