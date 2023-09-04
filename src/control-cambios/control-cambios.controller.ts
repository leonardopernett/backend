import {  Controller, UseGuards, Post, Body, HttpCode} from '@nestjs/common';
import { ControlCambiosModelService } from '../control-cambios/control-cambios.service';
import { JwtGuard } from "../jwt/jwt.guard";


@Controller('api/controlcambios')
export class ControlCambiosController { 


    constructor(private control:ControlCambiosModelService) { }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/mostrarcontrolcambio')
    mostrarControlcambio(
     
        @Body() body
    ): any {
        
        return this.control.mostrarcontroldecambio(body.id_articulo);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/mostrarcambio')
    mostrarCambio(
     
        @Body() body
    ): any {
        
        return this.control.mostrarcambio(body.id_cambio);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/selectcambio')
    selectCambio(
     
        @Body() body
    ): any {
        return this.control.cambioselect(body.id_articulo);
    }

}