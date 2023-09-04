import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MigracionModelService } from "./migracion-model.service";
import { User } from 'src/user.decorator';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('api/migrar')
export class MigracionController {
    constructor (private migracionModel:MigracionModelService){

    }

    @UseGuards(JwtGuard)
    @Get('usuarios')
    migrarUsuarios(
        @Query('from') from:number,
        @Query('size') size:number
    ){

        console.log(size)
        return this.migracionModel.migrateUsers(from, size);
    }
    
    @UseGuards(JwtGuard)
    @Get('usuariosbases')
    migrarUsuariosBases(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrateUserBases(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('categorias')
    migrarCategorias(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrarCategorias(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('articulos')
    migrarArticulo(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrarArticulos(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('vistas')
    migrarVistasArticulo(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrarVistasArticulo(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('comentarios')
    migrarComentariosArticulo(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrarComentario(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('favoritos')
    migrarFavoritos(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        console.log('prueba')
        return this.migracionModel.migrarFavoritos(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('megusta')
    migrarMeGusta(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.migrarMeGusta(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('arreglarArticulos')
    arreglarArticulos(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.agregarArticulosEs(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('arreglarCategorias')
    arreglarCategorias(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.arreglarCategorias(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('arreglarUsuarios')
    arreglarUsuarios(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.arreglarUsuarios(from, size);
    }

    @UseGuards(JwtGuard)
    @Get('buscararticulos')
    buscararticulos(
        @Query('from') from:number,
        @Query('size') size:number
    ){
        return this.migracionModel.buscararticulos(from, size);
    }



}