import {  Controller, Post, Body, Get,Req, Delete, Param, UseGuards } from '@nestjs/common';
import {UsuarioExternoService} from '../usuario-externo/usuario-externo.service';
import {sign,verify} from 'jsonwebtoken';
import {Request} from 'express';
import { JwtGuard } from '../jwt/jwt.guard';

@Controller('api/externo')
export class UsuarioExternoController {

    constructor(public Externo:UsuarioExternoService) { }

    @UseGuards(JwtGuard)
    @Post('mail')
    async sendmail(@Body() data){

       await this.Externo.sendmail(data);
    
       return "Mensaje enviado";

    }

    @UseGuards(JwtGuard)
    @Post('createuser')
    async createuser(@Req() rq:Request){

        if(rq.headers['authorization']){
            
            const token=rq.headers['authorization'];

            const payload=verify(token,'secretkey');

            if(payload){
                return await this.Externo.createuser(rq.body)
            }else{
                console.log("Error");
            }

        }else{
            console.log("No Cabecera");
        }

    }

    @UseGuards(JwtGuard)
    @Delete('deleteuser/:id')
    async deleteuser(@Param('id') id){
        
        return await this.Externo.deleteuser(id);

    }

    @UseGuards(JwtGuard)
    @Get()
    async getuser(){
        return await this.Externo.getuser();
    }

}