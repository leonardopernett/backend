import { Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";
import { Sesion } from "./entities";

export class sesionDTO {
    pcrc:string
}

export class updateSesionDTO {
    logout:string    
}

@Injectable()
export class UsersesionsModelService {
    constructor(
        private db:DbService,
        // private usersesionsIndex:UsersesionsIndex
    ){  }

    postUserSesion = async (userid, sesionData:sesionDTO) => {
        let [result] = await this.db.NIK<Sesion>('CALL crear_sesion(?, ?)',[ userid, sesionData.pcrc])
        return result
    }

    udpateUserSesion = async(id:string) => {
        return await this.db.NIK<Sesion>('CALL finalizar_sesion(?)',[ id ])
    }

    getUserSesions = async (userId:string) => {
        return await this.db.NIK<Sesion>('CALL get_sesiones_usuario(?)',[ userId ])
    }

}