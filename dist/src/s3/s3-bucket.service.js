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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketService = void 0;
const common_1 = require("@nestjs/common");
const S3 = require("aws-sdk/clients/s3");
const mime_types_1 = require("mime-types");
const uuid_1 = require("uuid");
let S3BucketService = class S3BucketService {
    constructor() {
        this.s3Client = new S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.ACCESS_KEY,
            region: 'us-west-1',
            sslEnabled: false
        });
        this.deleteFile = async (idArticle, fileName) => {
            let params = { Bucket: process.env.BUCKET_NAME, Key: `${idArticle}/${fileName}` };
            let deleteResult = await this.s3Client.deleteObject(params).promise();
            return deleteResult;
        };
        this.deleteImage = async (key) => {
            let params = { Bucket: process.env.BUCKET_NAME, Key: `${key}` };
            let deleteResult = await this.s3Client.deleteObject(params).promise();
            return deleteResult;
        };
    }
    async uploadFile(idArticle, file) {
        let params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${idArticle}/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        try {
            let uploadResul = await this.s3Client.upload(params).promise();
            return uploadResul.Key;
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException('error al guardar el archivo');
        }
    }
    base64MimeType(encoded) {
        var result = null;
        if (typeof encoded !== 'string') {
            return result;
        }
        var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
            result = mime[1];
        }
        return result;
    }
    async uploadImage(base64String, idArticle) {
        var mimeType = this.base64MimeType(base64String);
        let buf = new Buffer(base64String.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${idArticle}/${uuid_1.v4()}.${mime_types_1.extension(mimeType)}`,
            Body: buf,
            ContentType: mimeType
        };
        try {
            let uploadResul = await this.s3Client.upload(params).promise();
            return uploadResul;
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException('error al guardar el archivo');
        }
    }
    getFile(idArticle, fileName) {
        let params = { Bucket: process.env.BUCKET_NAME, Key: `${idArticle}/${fileName}` };
        return this.s3Client.getObject(params).createReadStream();
    }
};
S3BucketService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], S3BucketService);
exports.S3BucketService = S3BucketService;
//# sourceMappingURL=s3-bucket.service.js.map