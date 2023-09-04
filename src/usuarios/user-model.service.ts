import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IsByteLength, IsIn, IsNotEmpty, IsString } from "class-validator";
import * as R from 'remeda';
import * as sqlstring from 'sqlstring';
import { createQueryBuilder, getManager } from 'typeorm';
import { datosPersonales } from "../jarvisEntities/datosGenerales.entity";
import { DbService } from "../databases/db.service"
import { from } from 'rxjs';
import { userRaw } from "./entities";
import { articuloRaw } from 'src/articulos/entities';
import { BaseModelService } from '../bases/base-model.service'
 export class updateUserRolDTO {

    @IsNotEmpty({ message: "Debes proporcionar un rol" })
    @IsIn(['admin', 'publicador', 'user'], { message: "el rol debe ser 'admin','publicador' ó 'user' " })
    public rol: 'admin' | 'user' | 'publicador';

}

export class deleteUserDTO {
    public id: string
}

export class createUserDTO {
    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    documento:string;
}


@Injectable()
export class UserModelService {

    constructor(
        private db:DbService,
        private baseModel:BaseModelService
    ) { }

    public async createUser(nombre:string, documento:string){
        let result = await this.db.NIK<userRaw>(`call crear_usuario(?,?)`,[nombre, documento])
        return result[0]
    }

    public async getUserByUserName(userName:string){
        let result = await this.db.NIK<userRaw>('call get_usuario_by_username(?)',[userName])
        return result[0]
    }

    public async getUserByDocumento(userId:string){

        let [[nikUser], [jarvisUser]] = await Promise.all([
            this.db.NIK<userRaw>('call get_usuario_by_documento(?)',[userId]),
            this.db.JARVIS<{ nombre: string }>(`
                select
                    replace(concat(a.primer_nombre, ' ', a.segundo_nombre, ' ', a.primer_apellido, ' ', a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where a.documento = ?
            `,[userId])
        ])

        let userBases = (await (this.baseModel.getUserBases(userId)))
                        .map(base => base.pcrcs)
                        .reduce((prev,curr) => {
                            return [...prev,...curr]
                        },[])
                        .map(base => base.id_dp_pcrc)

        if(nikUser){
            return {
                cedula: userId ,
                nombre: nikUser.user_name,
                rol: nikUser.rol,
                pcrc: userBases,
                
            }
        } else {
            return {
                cedula: userId ,
                nombre: jarvisUser.nombre,
                rol: 'user',
                pcrc: userBases
            }
        }

    }

    public async deleteUser(userId: string): Promise<any> {
        return await this.db.NIK('call borrar_usario(?)',[userId])
    }

    public async getUserFavorites(userId: string, baseId:string, from: string, size: string) {
        return await this.db.NIK<articuloRaw>('CALL get_user_favoritos(?, ?, ?, ?)',[userId, baseId, from, size])
    }

    public searchUsers = async (query: string, baseId:string) => {
        
     

        if(typeof baseId == 'undefined' || baseId == null){
            let result = await this.db.JARVIS(`
                select
                a.documento as cedula,
                replace(concat(a.primer_nombre , ' ' , a.segundo_nombre , ' ' , a.primer_apellido, ' ' , a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where replace(concat(a.primer_nombre , ' ' , a.segundo_nombre , ' ' , a.primer_apellido, ' ' , a.segundo_apellido),'  ',' ') like ('%${query}%')
                or a.documento like ('%${query}%')
            `)
            
            if(result.length==0){

                let result = await this.db.NIK(`
                select
                a.documento as cedula,
                a.nombre
                from usuario_nik a
                where a.documento=?
            `,[query])

                return result

            }else{
                return result
            }
                        
        } else {
            let result = await this.db.JARVIS(`
                select 
                replace(concat(c.primer_nombre , ' ' , c.segundo_nombre , ' ' , c.primer_apellido, ' ' , c.segundo_apellido),'  ',' ') as nombre,
                c.documento as cedula
                from dp_datos_generales c
                inner join dp_distribucion_personal a
                on c.documento = a.documento
                inner join dp_pcrc b
                on a.cod_pcrc = b.cod_pcrc
                where a.fecha_actual = DATE_FORMAT( now(), concat('%Y-%m','-01'))
                and b.id_dp_pcrc = '${baseId}'
                and (
                replace(concat(c.primer_nombre , ' ' , c.segundo_nombre , ' ' , c.primer_apellido, ' ' , c.segundo_apellido),'  ',' ') like ('%${query}%')
                    or 
                c.documento like ('%${query}%')
                )
            `)
            
            return result
        }
    }

    public updateUser = async (userId:string, newRol:string) => {

        let [[nikUser], [jarvisUser]] = await Promise.all([
            this.db.NIK<userRaw>('call get_usuario_by_documento(?)',[userId]),
            this.db.JARVIS<{ nombre: string }>(`
                select
                    replace(concat(a.primer_nombre, ' ', a.segundo_nombre, ' ', a.primer_apellido, ' ', a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where a.documento = ?
            `,[userId])
        ])

        if(nikUser){
            await this.db.NIK('call actualizar_usuario_rol(?,?)',[ userId, newRol ])
        } else {
            await this.createUser(jarvisUser.nombre, userId)
            await this.db.NIK('call actualizar_usuario_rol(?,?)',[ userId, newRol ])
        }

    }

    public async getUserByUserBases(Cedula:string){
        let result = await this.db.NIK<userRaw>('call get_usuario_by_userandbases(?)',[Cedula])
        return result[0]
    }

    public async getUserBase(documento){
        return await this.db.NIK('select * from usuario_base where documento = ? ',[documento])
    }

}