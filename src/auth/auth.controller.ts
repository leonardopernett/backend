import { Controller, Get, Post, UseGuards, Res, Req, HttpCode, UseInterceptors, Param } from '@nestjs/common';
import { Response } from 'express';
import { UserjwtModelService } from "../jwt/userjwt-model.service";
import { RefreshJwtGuard } from "../jwt/refreshjwt.guard";
import { JwtGuard } from "../jwt/jwt.guard";
import { ActiveDirectoryGuard } from "./activeDiretory.guard";
import {newAsignacionBases} from './newAsignacionBases';
class user {
    "sub": string
    "name": string
    "rol": string
    "line": string
    "subLine": string
}

@Controller('api/auth')
export class AuthController {
    constructor(
        private userjwtModel:UserjwtModelService,
        private Asignacion:newAsignacionBases
    ) { }

    @UseGuards(ActiveDirectoryGuard)
    @Post('authenticate')
    @HttpCode(200)
    async login(@Req() req, @Res() res: Response) {
        
        this.Asignacion.AsignarPermisoAutomatizado(req.user.sub)

        this.Asignacion.AsignarOrigenUsuario(req.user.sub)

        this.Asignacion.borrarpermisosusuario(req.user.sub)

        this.Asignacion.AsignacionBases(req.user.sub)

        this.Asignacion.AsignacionBaseNik(req.user.sub)

        if(process.env.NODE_ENV == 'production'){
            let tokens = {
                token: this.userjwtModel.generateJwt(req.user),
                refreshToken: this.userjwtModel.generateRefresh_token(req.user)
            }

            let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken)

            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                expires: new Date(decodedRefresh.exp * 1000)
            })

            await this.userjwtModel.borrarJWT(req.user.sub)

            await this.userjwtModel.crearJWT(req.user.sub)

            res.send(tokens)

            


        } else {

            let tokens = {
                token: this.userjwtModel.generateJwt({ name:"julian andres vargas", sub:"1036673423", rol:'admin' }),
                refreshToken: this.userjwtModel.generateRefresh_token({ name:"julian andres vargas", sub:"1036673423", rol:'admin' })
            }

            let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken)

            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                expires: new Date(decodedRefresh.exp * 1000)
            })

            await this.userjwtModel.borrarJWT("1036673423")

            await this.userjwtModel.crearJWT("1036673423")

            res.send(tokens)
        }
    }
    
    @UseGuards(JwtGuard)
    @Get('log_out')
    async logOut(@Req() req, @Res() res: Response) {

        res.clearCookie('refresh_token', {
            httpOnly: true,
        })

        await this.userjwtModel.borrarJWT(req.user.sub)

        res.send({ status: 'logout' })

    }

    
   /*  @Get('asignar/:user_id')
    async asignacionpermisos(@Param('user_id') idUser:string) {

        this.Asignacion.borrarpermisosusuario(idUser)

        this.Asignacion.AsignacionBases(idUser)

    } */

    @UseGuards(RefreshJwtGuard)
    @Get('refresh_token')
    refreshToken(@Req() req, @Res() res: Response) {
        var tokens = {
            token: this.userjwtModel.generateJwt(req.user),
            refreshToken: this.userjwtModel.generateRefresh_token(req.user)
        }

        let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken)

        res.clearCookie('refresh_token', {
            httpOnly: true,
        })

        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            expires: new Date(decodedRefresh.exp * 1000)            
        })

        res.send(tokens)
    }

    @UseGuards(JwtGuard) 
    @Get('me')
    currentUser(@Req() req): Promise<user> {
        return req.user
    }

}
