import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { getManager } from "typeorm";
import * as sqlstring from 'sqlstring';
import * as R from 'remeda';

export type personData = {
    cedula:string;
    nombre:string;
}

export type client = {
    id_dp_clientes
    cliente:string;
}



@Injectable()
export class CargosModelService {

    // constructor( private pcrcModel:PcrcModelService ){  }

    // async getBoss(cedula:string):Promise<{documento:string}>{       

    //     return await createQueryBuilder<{documento:string}>('Personal')
    //             .select(['Personal.documento_jefe as documento'])
    //             .where('Personal.documento = :documento',{ documento: cedula })                
    //             .orderBy('Personal.fecha_actual','DESC')
    //             .limit(1)
    //         .getRawOne()
    // }

    // async getAllBoss(cedula:string){
    //     let info = { coordinador:'', director:'', gerente:'', lider:''};

    //     let lider = await this.getBoss(cedula)
        
    //     info.lider = lider.documento
        
    //     let coordi = await this.getBoss(info.lider)
        
    //     info.coordinador = coordi.documento

    //     let gerente = await this.getBoss(info.coordinador)
        
    //     info.gerente = gerente.documento

    //     let director = await this.getBoss(info.gerente)

    //     info.director = director.documento

    //     return info

    // }

    // getUnique<T>(arr:T[], comp: keyof T) {

    //     const unique = arr
    //          .map(e => e[comp])
      
    //        // store the keys of the unique objects
    //       .map((e, i, final) => final.indexOf(e) === i && i)
      
    //       // eliminate the dead keys & store unique objects
    //       .filter(e => arr[e]).map(e => arr[e]);
      
    //      return unique;
    // }

    // async getClientDirectors(clientId:string, userId:string):Promise<personData[]>{           

    //     const entityManager = getManager();

    //     if(clientId == 'all'){
    //         let directores:{documento_director:string, director_programa:string, id_dp_clientes:number, cliente:string}[] = await entityManager.query(`
    //             select a.documento_director,a.director_programa, a.id_dp_clientes, b.cliente
    //             from dp_centros_costos a
    //             inner join dp_clientes b
    //             on a.id_dp_clientes = b.id_dp_clientes
    //             inner join dp_pcrc c
    //             on a.id_dp_centros_costos = c.id_dp_centros_costos
    //             group by a.documento_director,  a.id_dp_clientes
    //         `)

    //         let userPcrcs = await this.pcrcModel.getUserPcrc(userId)

    //         let filteredResult = directores.filter(gerente => {
    //             return !!userPcrcs.find(userCliente => {
    //                 return userCliente.id_dp_clientes == gerente.id_dp_clientes
    //             })
    //         }).map(director => ({cedula:director.documento_director, nombre:director.director_programa}) )

    //         return this.getUnique(filteredResult,'cedula')

    //     } else {
    //         let result = await createQueryBuilder('CentrosCostos','centro')
    //         .select(['centro.documento_director as cedula', 'centro.director_programa as nombre'])
    //         .where('centro.id_dp_clientes = :cliente', { cliente: clientId })
    //         .groupBy('centro.documento_director')
    //         .getRawMany()
    //         return result
    //     }

    // }    

    // async getDirectorGerentes(documentoDirector:string, userId:string){

    //     const entityManager = getManager();

    //     let gerentes:{ nombre_completo:string, documento:string, cod_pcrc: string }[]
    //         = await entityManager.query(sqlstring.format(`
    //             select
    //                 d.nombre_completo,
    //                 d.documento,
    //                 e.cod_pcrc
    //             from dp_datos_generales d
    //             inner join (
    //                 select 
    //                     b.documento,
    //                     b.fecha_actual,
    //                     b.documento_jefe,
    //                     b.id_dp_cargos,
    //                     b.cod_pcrc
    //                 from dp_distribucion_personal b
    //                 inner join (
    //                     select 
    //                         max(a.fecha_actual) fecha,
    //                         a.documento documento
    //                     from dp_distribucion_personal a
    //                     group by a.documento
    //                 ) c
    //                 on c.documento = b.documento and c.fecha = b.fecha_actual
    //                 where 
    //                     b.documento_jefe = ?
    //                     and
    //                     b.id_dp_cargos = 24224
    //             ) e
    //             on d.documento = e.documento
    //         `,[documentoDirector])
    //     )

    //     let userPcrcs = await this.pcrcModel.getUserPcrc(userId)

    //     let flatenPcrcs = R.flatten(userPcrcs.map(cliente => cliente.pcrcs)).map(pcrc => pcrc.cod_pcrc)

    //     let filteredResult = gerentes.filter(gerente => {
    //         return !!flatenPcrcs.includes(gerente.cod_pcrc) && gerente.cod_pcrc != '0'
    //     }).map(gerente => ({cedula:gerente.documento, nombre:gerente.nombre_completo}) )

    //     return filteredResult

    // }

    // async getGerenteCoordinadores(documentoGerente:string, userId:string ){

    //     const entityManager = getManager();

    //     let coordinadores:{ nombre_completo:string, documento:string, cod_pcrc: string }[]
    //         = await entityManager.query(sqlstring.format(`
    //             select 
    //                 d.nombre_completo,
    //                 d.documento,
    //                 e.cod_pcrc
    //             from dp_datos_generales d
    //             inner join (
    //                 select 
    //                     b.documento,
    //                     b.fecha_actual,
    //                     b.documento_jefe,
    //                     b.id_dp_cargos,
    //                     b.cod_pcrc
    //                 from dp_distribucion_personal b
    //                 inner join (
    //                     select 
    //                         max(a.fecha_actual) fecha,
    //                         a.documento documento
    //                     from dp_distribucion_personal a
    //                     group by a.documento
    //                 ) c
    //                 on c.documento = b.documento and c.fecha = b.fecha_actual
    //                 where 
    //                     b.documento_jefe = ?
    //                     and
    //                     b.id_dp_cargos = 19196
    //             ) e
    //             on d.documento = e.documento
    //         `,[documentoGerente])
    //     )

    //     let userPcrcs = await this.pcrcModel.getUserPcrc(userId)

    //     let flatenPcrcs = R.flatten(userPcrcs.map(cliente => cliente.pcrcs)).map(pcrc => pcrc.cod_pcrc)

    //     let filteredResult = coordinadores.filter(coordinador => {
    //         return !!flatenPcrcs.includes(coordinador.cod_pcrc) && coordinador.cod_pcrc != '0'
    //     }).map(coordinador => ({cedula:coordinador.documento, nombre:coordinador.nombre_completo}) )

    //     return filteredResult
        
    // }

    // async getCoordinadorLideres(documentoCoordinador:string, userId:string ){

    //     const entityManager = getManager();

    //     let lideres:{ nombre_completo:string, documento:string, cod_pcrc: string }[]
    //         = await entityManager.query(sqlstring.format(`
    //             select 
    //                 d.nombre_completo,
    //                 d.documento,
    //                 e.cod_pcrc
    //             from dp_datos_generales d
    //             inner join (
    //                 select 
    //                     b.documento,
    //                     b.fecha_actual,
    //                     b.documento_jefe,
    //                     b.id_dp_cargos,
    //                     b.cod_pcrc
    //                 from dp_distribucion_personal b
    //                 inner join (
    //                     select 
    //                         max(a.fecha_actual) fecha,
    //                         a.documento documento
    //                     from dp_distribucion_personal a
    //                     group by a.documento
    //                 ) c
    //                 on c.documento = b.documento and c.fecha = b.fecha_actual
    //                 where 
    //                     b.documento_jefe = ?
    //                     and
    //                     b.id_dp_cargos = 30264
    //             ) e
    //             on d.documento = e.documento
    //         `,[ documentoCoordinador ])
    //     )

    //     let userPcrcs = await this.pcrcModel.getUserPcrc(userId)

    //     let flatenPcrcs = R.flatten(userPcrcs.map(cliente => cliente.pcrcs)).map(pcrc => pcrc.cod_pcrc)

    //     let filteredResult = lideres.filter(lider => {
    //         return !!flatenPcrcs.includes(lider.cod_pcrc) && lider.cod_pcrc != '0'
    //     }).map(lider => ({cedula:lider.documento, nombre:lider.nombre_completo}) )

    //     return filteredResult

    // }

    // async getUserPcrc(userId:string){
    //     const entityManager = getManager();

    //     let pcrc:{ cod_pcrc:string, pcrc:string, id_dp_pcrc: string }
    //         = await entityManager.query(sqlstring.format(`
    //             select
    //                 b.cod_pcrc,
    //                 dp.pcrc,
    //                 dp.id_dp_pcrc
    //             from dp_distribucion_personal b
    //             inner join (
    //                 select
    //                     max(a.fecha_actual) fecha,
    //                     a.documento documento
    //                 from dp_distribucion_personal a
    //                 group by a.documento
                
    //             ) c
    //             on c.documento = b.documento and c.fecha = b.fecha_actual
    //             inner join dp_pcrc dp on b.cod_pcrc = dp.cod_pcrc
    //             where
    //             b.documento = ?
    //         `,[ userId ])
    //     )

    //     return pcrc

    // }

    // getGerentePcrcs = async (gerenteId) => {
    //     const entityManager = getManager();

    //     let pcrcs:{ cod_pcrc:string, pcrc:string, id_dp_pcrc: string }[]
    //         = await entityManager.query(sqlstring.format(`
    //         select b.cod_pcrc, b.id_dp_pcrc, b.pcrc
    //         from dp_centros_costos a
    //         inner join dp_pcrc b on a.id_dp_centros_costos = b.id_dp_centros_costos
    //         where a.documento_gerente = ?
    //         `,[ gerenteId ])
    //     )

    //     return pcrcs
    // }

    // getDirectorPcrc = async (directorId) => {
    //     const entityManager = getManager();

    //     let pcrcs:{ cod_pcrc:string, pcrc:string, id_dp_pcrc: string }[]
    //         = await entityManager.query(sqlstring.format(`
    //         select b.cod_pcrc, b.id_dp_pcrc, b.pcrc
    //         from dp_centros_costos a
    //         inner join dp_pcrc b on a.id_dp_centros_costos = b.id_dp_centros_costos
    //         where a.documento_director = ?
    //         `,[ directorId ])
    //     )

    //     return pcrcs
    // }

}