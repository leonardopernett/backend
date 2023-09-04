import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../jwt/jwt.guard';
import { KeysService } from './keys.service';
var CryptoJS = require("crypto-js");

@Controller('api/key')
export class KeysController {

    constructor (
       private key:KeysService
    ){

    }

    @UseGuards(JwtGuard)
    @Post('save')
    async postNews(
        @Body() body
    ) {

        var ciphertext = CryptoJS.AES.encrypt(body.valor, 'abc').toString();

        await this.key.keysave(body.nombre,ciphertext,body.descripcion)
    }

   

}