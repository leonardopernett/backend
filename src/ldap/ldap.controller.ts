import {  Controller, UseGuards, Post, Body, HttpCode, Get, Param, Inject, Put, Query, Res} from '@nestjs/common';
import { LdapModelService } from '../ldap/ldap.service';
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('api/ldap')
export class LdapController {


    constructor(private Ldap:LdapModelService) { }

    @UseGuards(JwtGuard)
    @Post('/insertar')  
    async insertarLdap(
      @Body() body
    ){
     
      return await this.Ldap.insertarLdap(body.documento,body.password,body.nombre,body.correo_personal,body.genero_capturado,body.fecha_nacimiento,body.direccion,body.correo_corporativo,body.celular,body.telefono,body.tipo)

    }

    @UseGuards(JwtGuard)
    @Post('/editar')  
    async editarLdap(
      @Body() body
    ){
     
      return await this.Ldap.editarLdap(body.nombre,body.correo_personal,body.genero_capturado,body.fecha_nacimiento,body.direccion,body.correo_corporativo,body.celular,body.telefono,body.id,body.tipo,body.actividad)

    }
  
    @UseGuards(JwtGuard)
    @Get('/mostrar')  
    async mostrarLdap(){
     
      return await this.Ldap.mostrarLdap()

    }

    @UseGuards(JwtGuard)
    @Get('/genero')  
    async generoLdap(){
     
      return await this.Ldap.generoLdap()

    }

    @UseGuards(JwtGuard)
    @Get('/tipo')  
    async tipoLdap(){
     
      return await this.Ldap.tipoLdap()

    }

    @UseGuards(JwtGuard)
    @Post('/buscar')  
    async buscarLdap(
      @Body() body
    ){
     
      return await this.Ldap.buscarLdap(body.usuario)

    }

    @UseGuards(JwtGuard)
    @Post('/validaruser')  
    async validarLdap(
      @Body() body
    ){
     
      return await this.Ldap.validarusuario(body.usuario)

    }

    @UseGuards(JwtGuard)
    @Post('/eliminar')  
    async eliminarLdap(
      @Body() body
    ){
     
      return await this.Ldap.eliminarLdap(body.id,body.documento)

    }

    @UseGuards(JwtGuard)
    @Post('/desbloquear')  
    async desbloquear(
      @Body() body
    ){
     
      return await this.Ldap.desbloquearusuario(body.id,body.desbloquearnew)

    }

    @UseGuards(JwtGuard)
    @Post('/ingreso')  
    async ingreso(
      @Body() body
    ){
     
      return await this.Ldap.ingreso(body.id)

    }

    @UseGuards(JwtGuard)
    @Post('/primeringreso')  
    async primeringreso(
      @Body() body
    ){
     
      return await this.Ldap.primeringreso(body.id)

    }

    @UseGuards(JwtGuard)
    @Post('/cambiarpassword')  
    async cambiarpassword(
      @Body() body
    ){
     
      return await this.Ldap.cambiarpassword(body.id,body.passwordnuevo)

    }

}