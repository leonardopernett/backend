import { Body, Controller, HttpCode, Post, UseGuards, Get, Put, Param, Delete, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from "../jwt/jwt.guard";
import { perfilDTO, PermisionsModelService, permisoDTO } from "./permisions-model.service";


@Controller('api/permisos')
export class PermisosController {

    constructor(
        private permisionsModel:PermisionsModelService
    ){  }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deletePermiso(
        @Param('id') idPermiso:string
    ){
        return await this.permisionsModel.borrarPermiso(idPermiso)
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updatePermiso(
        @Param('id') idPermiso:string,
        @Body() permisoDTO:permisoDTO
    ){
        return await this.permisionsModel.actualizarPermiso(idPermiso, permisoDTO)
    }

}
