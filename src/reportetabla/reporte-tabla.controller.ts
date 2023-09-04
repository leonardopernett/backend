import {  Controller,  Inject, UseInterceptors, UploadedFile, Post, Body, Req, Res, Get, UseGuards} from '@nestjs/common';
import { JwtGuard } from "../jwt/jwt.guard";
import { ReportsTableModelService } from './reporte-tabla-model.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import multer = require('multer');
import S3 = require('aws-sdk/clients/s3');
const excelToJson = require('convert-excel-to-json');
import * as fs from 'fs'
import { unlink } from 'fs-extra';

@Controller('api/reportable')
export class ReportsTableController {

  s3Client = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID_REPO,
    secretAccessKey:process.env.ACCESS_KEY_REPO,
    region: 'us-east-1',
    sslEnabled:false
  

})

    constructor(private Reporte:ReportsTableModelService) { }

    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image',{
      storage: multer.diskStorage({
         destination:'./public/uploads',
         filename:(req, file, cb)=>{
           cb(null, Date.now()+extname(file.originalname))
         }
      }) 
   }))
     @Post('/upload')
      async uploadFile(@UploadedFile() image,@Body() body,@Req() req,@Res() res) {
        
        this.Reporte.borrarpermisos().then(data=>{

          const result = excelToJson({
            sourceFile: './public/uploads/'+image.filename
        });
  
       

        result.Hoja1.forEach(data => {

          this.Reporte.guardarpermisos(data.A,data.B)
    
        });

      })


       let parametro:any = {
        Bucket:process.env.BUCKET_REPOSITORIO,
        Key: 'folder/'+image.filename,
        Body: fs.createReadStream('./public/uploads/'+image.filename),
        ACL    : 'public-read'
       
  }

  let uploadResul = await this.s3Client.upload(parametro).promise() 
  
 
  const name = image.originalname.split('.')[0]
  let param = {
       user:body.username,
       documento:body.documento,
       url: `${process.env.BUCKET_URL}/folder/${image.filename}`
  } 
     await this.Reporte.guardartable(param)
     await unlink(image.path)
     return res.json({message:'documento guardado'})  
    
      } 

      @UseGuards(JwtGuard)
      @Get('/download')
      downloadFile(){
        return this.Reporte.obtenerpermisos()
      }

    
}