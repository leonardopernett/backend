import { Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service"
import * as jwt from "jsonwebtoken";

export type token = {sub:string, name:string, rol:string, permiso:any, iat:number, exp:number }


@Injectable()
export class UserjwtModelService {
    constructor(
        private db:DbService
    ) { }

    crearJWT = async (userId:string) => {
        return await this.db.NIK(`CALL crear_jwt(?)`,[userId])
    }

    borrarJWT = async (userId:string) => {
        return await this.db.NIK(`CALL borrar_jwt(?)`,[userId])
    }

    getJWT = async (userId) =>{
        return await this.db.NIK(`CALL get_jwt(?)`,[userId])
    }

    generateJwt(user) {
        return jwt.sign(
            user
            , process.env.JWT_PRIVATE_KEY,
            {
                expiresIn:'5m'
            }
        )
    }

    generateRefresh_token(user){   
        return jwt.sign(
            user
            , process.env.REFRESH_JWT_PRIVATE_KEY,
            {
                expiresIn:'10h'
            }
        )
    }

    validateJwt(token:string){
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY) as token
    }

    validateRefreshJwt(token:string){
        return jwt.verify(token, process.env.REFRESH_JWT_PRIVATE_KEY) as token
    }

    decodeToken(token):token{
        let tokens = jwt.decode(token) as token
        return tokens
    }

}