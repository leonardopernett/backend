import { Body, Controller, HttpCode, Post, UseGuards, Get, Put, Param, Delete, UseInterceptors, Req } from '@nestjs/common';
import { AutorizationGuard } from '../jwt/autorization.guard';
import { JwtGuard } from "../jwt/jwt.guard";
import { perfilDTO, PermisionsModelService, permisoDTO } from "./permisions-model.service";



@Controller('api/perfiles')
export class PerfilesController {

    constructor(
        private permisionsModel:PermisionsModelService
    ){  }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('')
    async createPerfil(
        @Body() perfilDTO:perfilDTO
    ){
        let result = await this.permisionsModel.crearPerfil(perfilDTO.nombre)
        return {
            status:'created'
        }
    }

    //! modificar para que solo retorne los perfiles a los que tiene permiso el usuario
    @UseGuards(JwtGuard)
    @Get('')
    async getPerfiles(){
        return await this.permisionsModel.getPerfiles()
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async actualizarPerfil(
        @Param('id') idPerfil:string,
        @Body() perfilDTO:perfilDTO
    ){
        return await this.permisionsModel.actualizarPerfil(idPerfil, perfilDTO.nombre)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deletePerfil(
        @Param('id') idPerfil:string
    ){
        return await this.permisionsModel.borrarPerfil(idPerfil)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post(':id/permisos')
    async asignarPermiso(
        @Body() permisoDTO:permisoDTO,
        @Param('id') idPerfil:string
    ){
        let result = await this.permisionsModel.asignarPermiso(idPerfil ,permisoDTO)
        return {
            status:'created'
        }
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get(':id/permisos')
    async getPermisos(
        @Param('id') idPerfil:string
    ){
        return await this.permisionsModel.getPermisos(idPerfil)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('buscar')
    async buscarusuario(
        @Body() body
    ){
      
        return await this.permisionsModel.getuserpermiso(body.cedula);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('buscarid')
    async buscarusuarioid(
        @Body() body
    ){
      
        return await this.permisionsModel.obteneridusuario(body.cedula);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get('permisocategoria')
    async permisocategoria(){
      
        return await this.permisionsModel.permisoscategorias();
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get('permisocategoriapi')
    async permisocategoriapi(){
      
        return await this.permisionsModel.permisoscategoriasapi();
        
    }


    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('permiso')
    async permiso(
        @Body() body
    ){
     
        return await this.permisionsModel.permisos(body.idusuario);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('permisoapi')
    async permisoapi(
        @Body() body
    ){
     
        return await this.permisionsModel.permisos_api(body.idusuario);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('permisoasignar')
    async permisoasignar(
        @Body() body
    ){
     
        return await this.permisionsModel.asignacionpermisos(body.idpermiso,body.idusuario,body.accion);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('permisoasignarapi')
    async permisoasignarapi(
        @Body() body
    ){
     
        return await this.permisionsModel.asignacionpermisosapi(body.idpermiso,body.idusuario,body.accion);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('permisoasignarol')
    async permisoasignarol(
        @Body() body
    ){
     
        return await this.permisionsModel.permisoasignarol(body.idrol,body.idpermiso,body.accion);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('buscarusuarioapi')
    async buscarusuarioapi(
        @Body() body
    ){
     
        return await this.permisionsModel.buscarusuarioapi(body.usuario);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('roles')
    async getroles(
        @Body() body
    ){
     
        return await this.permisionsModel.getRoles(body.idusuario);
        
    }


    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('rolesasignar')
    async rolesasignar(
        @Body() body
    ){
     
        return await this.permisionsModel.asignarol(body.idusuario,body.idrol);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get('obtenerol')
    async obtenerol(){

         let data=await this.permisionsModel.obtenerol();
         return data[0];

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get('obteneruserapi')
    async obteneruserapi(){

         let data=await this.permisionsModel.obteneruserapi();
         return data[0];

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('crearol')
    async crearol(
        @Body() body
    ){
     
        return await this.permisionsModel.crearol(body.rol);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('crearusuarioapi')
    async crearusuarioapi(
        @Body() body
    ){
    
    return await this.permisionsModel.crearusuarioapi(body.usuario,body.password,body.estado);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('editarusuarioapi')
    async editarusuarioapi(
        @Body() body
    ){
    
    return await this.permisionsModel.editarusuarioapi(body.id,body.usuario,body.password,body.estado);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('eliminarusuarioapi')
    async eliminarusuarioapi(
        @Body() body
    ){
    
    return await this.permisionsModel.eliminarusuarioapi(body.id)
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('editarol')
    async editarol(
        @Body() body
    ){
     
        return await this.permisionsModel.editarol(body.rol,body.id);
        
    }


    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('eliminarol')
    async eliminarol(
        @Body() body
    ){
     
        return await this.permisionsModel.eliminarol(body.id);
        
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('obtenerolpermiso')
    async obtenerpermisorol(
        @Body() body
    ){
     
        return await this.permisionsModel.obtenerpermisorol(body.idrol)
        
    }


}