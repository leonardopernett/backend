/// <reference types="node" />
import * as S3 from 'aws-sdk/clients/s3';
export declare class S3BucketService {
    constructor();
    s3Client: S3;
    uploadFile(idArticle: string, file: any): Promise<string>;
    base64MimeType(encoded: any): any;
    uploadImage(base64String: string, idArticle: string): Promise<S3.ManagedUpload.SendData>;
    getFile(idArticle: string, fileName: string): import("stream").Readable;
    deleteFile: (idArticle: string, fileName: any) => Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk/lib/error").AWSError>>;
    deleteImage: (key: any) => Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk/lib/error").AWSError>>;
}
