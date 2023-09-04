import { Injectable, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { ArticlesModelService } from "../articulos/articles-model.service";
import * as S3 from 'aws-sdk/clients/s3';
import { extension } from "mime-types";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class S3BucketService {

    constructor(){ }

    s3Client = new S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.ACCESS_KEY,
        region: 'us-west-1',
        sslEnabled:false
    });

    async uploadFile(idArticle: string, file: any) {
        let params = { 
            Bucket: process.env.BUCKET_NAME,
            Key: `${idArticle}/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        try {
            
            let uploadResul = await this.s3Client.upload(params).promise()

            return uploadResul.Key

        } catch(err) {
            console.log(err)
            throw new InternalServerErrorException('error al guardar el archivo');
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
    
    async uploadImage(base64String:string, idArticle:string){
        
        var mimeType = this.base64MimeType(base64String)

        let buf = new Buffer(base64String.replace(/^data:image\/\w+;base64,/, "") ,'base64')

        let params = { 
            Bucket: process.env.BUCKET_NAME,
            Key: `${idArticle}/${uuidv4()}.${extension(mimeType)}`,
            Body: buf,
            ContentType: mimeType
        };

        try {

            let uploadResul = await this.s3Client.upload(params).promise()

            return uploadResul

        } catch(err) {
            console.log(err)
            throw new InternalServerErrorException('error al guardar el archivo');
        }

    }
    
    getFile(idArticle:string, fileName:string){
      
        let params = { Bucket: process.env.BUCKET_NAME, Key: `${idArticle}/${fileName}` };
        return this.s3Client.getObject(params).createReadStream();
    }
    
    deleteFile = async (idArticle:string, fileName:any) => {

        let params = { Bucket: process.env.BUCKET_NAME, Key: `${idArticle}/${fileName}` };

        let deleteResult = await this.s3Client.deleteObject(params).promise();

        return deleteResult
        
    }

    deleteImage = async (key:any) => {

        let params = { Bucket: process.env.BUCKET_NAME, Key: `${key}` };

        let deleteResult = await this.s3Client.deleteObject(params).promise();

        return deleteResult
    }
}