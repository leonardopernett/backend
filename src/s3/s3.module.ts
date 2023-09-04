import { Module } from '@nestjs/common';
import { S3BucketService } from "./s3-bucket.service";
import { FilesController } from "./files.controller";

@Module({
    controllers: [
        FilesController
    ],
    providers: [
        S3BucketService,
    ],
    exports: [
        S3BucketService
    ],
    imports: []

})
export class S3Module {}
 