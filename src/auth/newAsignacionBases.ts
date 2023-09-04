import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { map, any } from 'async';

import { DbService } from "../databases/db.service"

@Injectable()
export class newAsignacionBases {

    constructor(
        private db:DbService
    ) { }

    public async AsignarPermisoAutomatizado(cedula) {
        
        let datos:any = await this.db.JARVIS(`SELECT
        a.documento,f.id_dp_posicion,f.posicion,h.id_dp_funciones,h.funcion
        
        FROM dp_distribucion_personal a
        
        JOIN dp_cargos e
        ON e.id_dp_cargos=a.id_dp_cargos
        
        JOIN dp_posicion f
        ON f.id_dp_posicion=e.id_dp_posicion
        
        JOIN dp_funciones h
        ON h.id_dp_funciones=e.id_dp_funciones
        
        WHERE  a.fecha_actual = ( SELECT MAX(b.fecha_actual) FROM dp_distribucion_personal b WHERE b.documento = ?  )
        AND a.documento=?`,[ cedula,cedula])

        if(datos.length!=0){

        let idpermiso:any=await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_usuario_rol WHERE id_funcion=? AND id_posicion=?',[datos[0].id_dp_funciones,datos[0].id_dp_posicion])
        
        let idusuario:any=await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?',[cedula])
    
        let array=idpermiso[0].map(item => [item.id_permiso,idusuario[0][0].id])

        if(array.length!=0){

        await this.db.nikcleanPoolConection.query('REPLACE INTO permisos_usuario (id_permiso,id_usuario) VALUES ?',[array])

        }

        }

    }

    public async AsignarOrigenUsuario(cedula) {
        
            let pcrc:any = await this.db.JARVIS('SELECT dp_distribucion_personal.cod_pcrc FROM dp_distribucion_personal WHERE dp_distribucion_personal.documento=? ORDER BY dp_distribucion_personal.fecha_actual DESC LIMIT 1',[ cedula ]) 

            if(pcrc.length!=0){

            await this.db.nikcleanPoolConection.query('REPLACE INTO origen_usuario (cedula,pcrc_usuario) VALUES (?,?)',[cedula,pcrc[0].cod_pcrc])

            }

   }

    public async AsignacionBases(cedula) {
         try {
             let pcrc:any = await this.db.JARVIS('SELECT dp_distribucion_personal.cod_pcrc FROM dp_distribucion_personal WHERE dp_distribucion_personal.documento=? ORDER BY dp_distribucion_personal.fecha_actual DESC LIMIT 1',[ cedula ]) 
            
             if(pcrc.length!=0){
             
             let asignarpcrc:any = await this.db.NIK(`SELECT dp_pcrc.id_dp_pcrc FROM permisos_multiples 
             JOIN dp_pcrc ON dp_pcrc.cod_pcrc=permisos_multiples.pcrc_destino 
             WHERE permisos_multiples.pcrc_origen=? 
             GROUP BY permisos_multiples.pcrc_origen,permisos_multiples.pcrc_destino
             UNION
             SELECT b.id_dp_pcrc FROM permisos_multiples a 
             JOIN dp_pcrc_nik b ON b.id_dp_pcrc=a.pcrc_destino 
             WHERE a.pcrc_origen=? 
             GROUP BY a.pcrc_origen,a.pcrc_destino`,[pcrc[0].cod_pcrc,pcrc[0].cod_pcrc])
         
             asignarpcrc.forEach(element => {

            this.db.NIK('call asign_base_to_user(?, ?, ?)',[cedula, element.id_dp_pcrc,1])
   
         });

        }

         } catch (error) {
             console.log(error)
         }

    }

    public async AsignacionBaseNik(cedula){

        let asignarpcrc:any=await this.db.NIK(`select
        a.id_dp_pcrc,
        a.pcrc,
        c.nombre,
        c.id_clientes
        from dp_pcrc_nik a
        inner join dp_clientes_nik c
        ON c.id_clientes = a.base_id
        WHERE c.tipo_base=1`)

        asignarpcrc.forEach(element => {

            this.db.NIK('call asign_base_to_user(?, ?, ?)',[cedula, element.id_dp_pcrc,1])
   
         });

    }

    borrarpermisosusuario(cedula){
        this.db.NIK(`DELETE FROM usuario_base WHERE usuario_base.documento=? AND usuario_base.estado_permisos=1`,[cedula])
    }

    

}