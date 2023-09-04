import { S3BucketService } from "./s3-bucket.service";
import { Response } from 'express';
import { DbService } from "../databases/db.service";
export declare class FilesController {
    private S3BucketService;
    private db;
    constructor(S3BucketService: S3BucketService, db: DbService);
    getFile(idArticle: string, fileName: string, res: Response): void;
    deleteFileAux(idArticle: any, fileName: any): Promise<void>;
}
