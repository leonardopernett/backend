import { Body, Controller, Delete, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from "../jwt/jwt.guard";
import { EsClientService } from "./es-client.service";



@Controller('es-client')
export class EsClientController {

    constructor(
        private EsClientService: EsClientService
    ) { }

    @UseGuards(JwtGuard)
    @Post('index/:id')
    createIndex(
        @Param('id') indice
    ): any {
        return this.EsClientService.createIndex(indice)
    }

    @UseGuards(JwtGuard)
    @Delete('index/:id')
    deleteIndex(
        @Param('id') indice
    ): any {
        return this.EsClientService.deleteIndex(indice);
    }

    // @UseGuards(JwtGuard)
    // @Put('index/:id/fields')
    // addFieldToIndex(
    //     @Body() fieldData:{type:'text' | 'keyword' | 'integer', name:'string'},
    //     @Param('id') indice
    // ): any {
    //     return this.esClientService.addFieldToIndex(indice, fieldData.name, fieldData.type);
    // }

    // @UseGuards(JwtGuard)
    // @Post('status')
    // checkStatus(): any {
    //     return this.esClientService.DDBB_status();
    // }

}