import {  Controller, UseGuards, Post, Body, Get, Param} from '@nestjs/common';
import { ResetModelService } from '../reset/reset.service';
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('api/reset')
export class ResetController {


    constructor(private Reset:ResetModelService) { }

    @UseGuards(JwtGuard)
    @Post('/password')  
    async generarToken(
      @Body() body
    ){
     
      return await this.Reset.generarToken(body.email)

    }

    @Post('/validar')  
    async validarToken(
      @Body() body
    ){
     
      return await this.Reset.validartoken(body.token)

    }

    @Post('/pass')  
    async resetPass(
      @Body() body
    ){
     
      let data=await this.Reset.validartoken(body.token)

      if(data!=0){
      return await this.Reset.resetPassword(body.email,body.passwordnuevo)
      }

    }

}