import {  Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {  FileInterceptor } from '@nestjs/platform-express';
import {  diskStorage } from 'multer'
import {  extname } from 'path';
import { User } from '../user.decorator';
import { User as U } from '../usuarios/entities';
import {  RepositorioServices } from './repositorio.services';
import * as S3 from 'aws-sdk/clients/s3'

import {unlink} from 'fs-extra'
import * as fs from 'fs'
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('api/repositorio')
export class RepositorioController {

   
   /* connection s3 czlFLiw4VA3/Jd7V8h6+AmAskXO8Rd0ldqEHlQ2X   AKIAW6D2CQ656HGOXZHH*/
   s3Client = new S3({
             accessKeyId: process.env.ACCESS_KEY_ID,
             secretAccessKey:process.env.ACCESS_KEY,
             region: 'us-east-1',
             sslEnabled:false
      })
      constructor(private readonly respositoryService:RepositorioServices) { }

      @UseGuards(JwtGuard)
      @UseInterceptors(FileInterceptor('image',{
         storage: diskStorage({
            destination:'./dist/uploads',
            filename:(req, file, cb)=>{
              cb(null, Date.now()+extname(file.originalname))
            }
         }) 
      }))
        @Post(':idArticulo')
         async uploadFile(@Body() body , @UploadedFile() image, @Res() res, @Param('idArticulo') idArticulo,@User() User:U ) {

                   let parametro:any = {
                         Bucket:process.env.BUCKET_NAME,
                         Key: 'folder/'+image.filename,
                         Body: fs.createReadStream('./dist/uploads/'+image.filename),
                         ACL    : 'public-read'
                        
                   }
      
                   let uploadResul = await this.s3Client.upload(parametro).promise() 
                  
                  
                   const name = image.originalname.split('.')[0]
                   let param = {
                        nombre_archivo:name,
                        extension:extname(image.originalname),
                        peso:image.size, 
                        documento_creador:body.username,
                        s3_name:image.filename, 
                        id_articulo:idArticulo,
                        url: `${process.env.BUCKET_URL}/folder/${image.filename}`
                   } 
                      await this.respositoryService.saveReposit(param)
                      await unlink(image.path)
                      return res.json({message:'documento guardado'}) 
          
         } 

        @UseGuards(JwtGuard)
        @Get(':IdArticulo')
         async getRepositorioByArticuloId(@Res() res, @Param('IdArticulo') IdArticulo){
            
            const documents =  await this.respositoryService.getRePositoryId(IdArticulo)
            return res.json(documents)
         } 
          
        @UseGuards(JwtGuard)
        @Get('file/:IdArticulo')
        getallFile(@Body() body , @Param('IdArticulo') IdArticulo){
            const params = {
               Bucket: process.env.BUCKET_REPOSITORIO, 
               Key:'folder/'+body.filename,
            }

             this.s3Client.getObject(params,function(err, data){
               if(err){ 
                  console.log(err) 
               }
               fs.writeFileSync('./public/'+ body.filename, data.Body)
               return body 
              
            }) 
                
               
          }
       
         @UseGuards(JwtGuard)
         @Put(':id')
         async deleteBorradorDocumento(@Param('id') id,@Res() res, @User() User:U, @Body() body ){
            await this.respositoryService.deleteBorrador(id, body.username)
            return res.json({message:'documento eliminado'})
         } 
     
} 
