import { Body, Controller, Get, Post, Param, UseGuards,Delete,Res} from '@nestjs/common';
import { JwtGuard } from '../jwt/jwt.guard';
import { NotificacionesServices } from './notificaciones.service';
import { Response } from 'express'
import { DepurarGuard } from '../jwt/depurar.guard';
import { AutorizationGuard } from '../jwt/autorization.guard';

@Controller('/api/notificaciones')
export class NotificacionesController {

   constructor(private readonly notificaciones:NotificacionesServices){}
   

   @UseGuards(AutorizationGuard)
   @Post('depurar')
   async getDepurarNotificaciones( 
       @Res()res:Response 
       ){
       await this.notificaciones.getDepuracion()
       return res.status(200).json({message:'depurarcion exitosa'});
   }
  

    @UseGuards(JwtGuard)
    @Post('/')
    async getNotificaciones(@Body() body){
      
        const { documento } = body
       /*   const offset = ( page - 1 ) * 5  */
        const result = await this.notificaciones.getNotificaciones(documento)
        return result
    } 

    @UseGuards(JwtGuard)
    @Post('/leidas')
    async getNotificacionesLeidas(@Body() body){
        const { documento, id_notificacion } = body
        const result = await this.notificaciones.getNotificacionesLeidas(documento, id_notificacion)
        return result
    } 
  
    @UseGuards(JwtGuard)
    @Get('/no-leidas')
    async getNotificacionesNoLeidas(){
        
    }
    
    @UseGuards(JwtGuard)
    @Get('/:id')
     async getNotificacionesById(@Param('id') documento){
     return this.notificaciones.getById(documento) 
    }

    @UseGuards(AutorizationGuard)
    @Get('notify/:id')
     async getNotificacionesById2(@Param('id') documento){
     return this.notificaciones.getById(documento) 
    }


    @UseGuards(JwtGuard)
    @Post('/create-article')
    async getNotificationSaveArticle(@Body() body ){ 
         return await this.notificaciones.getCreateArticle(body)
    }


    @UseGuards(JwtGuard)
    @Post('/update-article')
    async getNotificationUpdateArticle(@Body() body){
        return await this.notificaciones.getUpdateArticle(body)
    }


    @UseGuards(JwtGuard)
    @Post('/comment-response') 
    async getNotificationResponseComment(@Body() body){
        return await this.notificaciones.getComment(body)
    }


    @UseGuards(JwtGuard)
    @Get('active')
    async getNotificationActive(){
       const result = await this.notificaciones.getActive()
       return result[0]
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async getNotificationDelete(@Param('id') id, @Res() res){
         await this.notificaciones.deleteNotificaciones(id)
         return res.json({message:'eliminado notificaciones'}) 
    }


     
     
} 

