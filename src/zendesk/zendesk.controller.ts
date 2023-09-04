import {
  Controller,
  UseGuards,
  Body,
  Get,
  Put,
  Res
} from '@nestjs/common';
import { Response } from 'express';

import { AutorizationGuard } from '../jwt/autorization.guard';
import { JwtGuard } from "../jwt/jwt.guard";
import { ZendeskModelService } from '../zendesk/zendesk-model.service';



@Controller('api/zendesk')

export class ZendeskController {


    constructor(private zendesk:ZendeskModelService) { }

    @UseGuards(JwtGuard)
    @Get('articulos')
    getArticulo(){
      return this.zendesk.getarticulozendesk();
    }


    @UseGuards(JwtGuard)
    @Put('changearticulo')
    changeArticulo(@Body() articulo){
      return this.zendesk.changearticulozendesk(articulo);
    }

    ////SE ESTA USANDO EN JENKIS//////
    
    @Get('insertar')
    async cargardata(
      @Res() res:Response
    ){
      await this.zendesk.guardarzendesk();
      return res.status(200).json({message:'articulo de zendesk insertado'})
    }

  
  ////SE ESTA USANDO EN JENKIS//////
  @Get('actualizartotal')
  async updatetotal(
    @Res() res:Response
  ) {
    await this.zendesk.actualizarzendesk();
    return res.status(200).json({message:'articulo de zendesk actualizado'})
  }

////SE ESTA USANDO EN JENKIS//////
  
  @Get('borrar')
  async borrar(
    @Res() res:Response
  ) {
    await  this.zendesk.borrarzendesk();
    return res.status(200).json({message:'articulo de zendesk borrdado'})
  }

 /* 
  @Get('borrarfaq')
    async borrarfaq(){
      return this.zendesk.borrarzendeskfaq();
  }

  @Get('migrar')
  async migrar(){
    return this.zendesk.migrarzendesk();
  } */


}