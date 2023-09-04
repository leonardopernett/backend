import { Controller, Get, Param, Query, Res, Delete, UseGuards } from '@nestjs/common';
import { S3BucketService } from "./s3-bucket.service";
import { Response } from 'express';
import { DbService } from "../databases/db.service";
import { JwtGuard } from '../jwt/jwt.guard';

@Controller('files')
export class FilesController {
    constructor (
        private S3BucketService:S3BucketService,
        private db:DbService,
        
    ){

    }


    @Get(':articuloId/:fileName')
    getFile(
        @Param('articuloId') idArticle:string,
        @Param('fileName') fileName:string,
        @Res() res:Response
    ){

        let stream = this.S3BucketService.getFile(idArticle, fileName)
        stream.on('error', function(err){
            res.status(500).json({error:"Error -> " + err});

        }).pipe(res);

    }

   
    @Delete(':idArticle/:fileName')
    async deleteFileAux(
        @Param('idArticle') idArticle,
        @Param('fileName') fileName
    ) {
        await Promise.all([
            this.S3BucketService.deleteFile(idArticle, fileName),
            this.db.NIK(`call borrar_adjunto(?,?)`,[idArticle, fileName])
        ]) 
    }

}