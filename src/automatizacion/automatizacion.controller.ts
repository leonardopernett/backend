import {  Controller, UseGuards, Post, Body, HttpCode, Get, Param, Inject, Put, Query, Res} from '@nestjs/common';
import { JwtGuard } from "../jwt/jwt.guard";
import { AutomatizacionModelService } from '../automatizacion/automatizacion-model.service';
import { AutorizationGuard } from '../jwt/autorization.guard';
import {Response} from 'express'


@Controller('api/automatizacion')
export class AutomatizacionController {


    constructor(private Automatizacion:AutomatizacionModelService) { }

  
    @UseGuards(AutorizationGuard)
    @Get('pcrc')  
    async consulta(){

    this.Automatizacion.pcrc();

    }

    @UseGuards(AutorizationGuard)
    @Get('cliente')  
    async consultados(){

    this.Automatizacion.cliente();

  }

  @UseGuards(AutorizationGuard)
  @Get('consolidar')
  async consolidar(){

    this.Automatizacion.consolidar();

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_vista/:dias')
  async depurarVista(
    @Param('dias') dias,
    @Res() res:Response
  ){
  
    const resp=await this.Automatizacion.depurarVista(dias);

    return res.json({
      mensaje:resp,
      dias
    })

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_busqueda/:dias')
  async depurarBusqueda(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await this.Automatizacion.depurarBusqueda(dias);

    return res.json({
      mensaje:resp,
      dias
    })
    

  }
  
  @UseGuards(AutorizationGuard)
  @Get('depurar_cambio/:dias')
  async depurarCambioArticulo(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await this.Automatizacion.depurarCambioArticulo(dias);

    return res.json({
      mensaje:resp,
      dias
    })

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_comentario/:dias')
  async depurarComentario(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await  this.Automatizacion.depurarComentario(dias);

    return res.json({
      mensaje:resp,
      dias
    })

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_sesion/:dias')
  async depurarSesion(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await  this.Automatizacion.depurarSesion(dias);

    return res.json({
      mensaje:resp,
      dias
    })
    

  }


  @UseGuards(AutorizationGuard)
  @Get('depurar_tipo_evento/:dias')
  async depurarTipoEvento(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await  this.Automatizacion.depurarTipoEvento(dias);

    return res.json({
      mensaje:resp,
      dias
    })
    

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_jwt/:dias')
  async depurarJwt(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await   this.Automatizacion.depurarJwt(dias);

    return res.json({
      mensaje:resp,
      dias
    })
   

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_usuario/:dias')
  async depurarUsuario(
    @Param('dias') dias
  ){

    this.Automatizacion.depurarUsuario(dias);

  }


  @UseGuards(AutorizationGuard)
  @Get('depurar_backup_busqueda/:dias')
  async depurarBackupBusqueda(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await   this.Automatizacion.depurarBackupBusqueda(dias);

    return res.json({
      mensaje:resp,
      dias
    })
   

  }


  @UseGuards(AutorizationGuard)
  @Get('depurar_backup_cambio_articulo/:dias')
  async depurarBackupCambioArticulo(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await   this.Automatizacion.depurarBackupCambioArticulo(dias);

    return res.json({
      mensaje:resp,
      dias
    })
   

  }

  @UseGuards(AutorizationGuard)
  @Get('depurar_backup_sesion/:dias')
  async depurarBackupSesion(
    @Param('dias') dias,
    @Res() res:Response
  ){

    const resp=await   this.Automatizacion.depurarBackupSesion(dias)

    return res.json({
      mensaje:resp,
      dias
    })
   

  }

  
  @Get('depurar_vista_mes/:fechainicial/:fechafinal')
  async depurarVistaMes(
    @Param('fechainicial') inicial,
    @Param('fechafinal') final,
    @Res() res:Response
  ){

    const resp=await   this.Automatizacion.depurarVistaMes(inicial,final)

    return res.json({
      mensaje:resp
    }) 
   

  }

}