import { Injectable } from '@nestjs/common';
import { DbService } from '../databases/db.service';


@Injectable()
export class NotificacionesServices {

    constructor(private db?:DbService){}
    //hello
    async getNotificaciones(documento?:string, page?:any){
        const result = await  this.db.NIK('CALL `notificaciones_get`(?)',[documento])
        return result 
    } 
    
    async getNotificacionesLeidas(documento:string, id_notificacion:any){ 
       return await this.db.NIK('replace into notificaciones_leidas(id_user,notificaciones_id) values(?,?) ',[documento, id_notificacion])
    }

    async getById(documento){ 
       const [result] =  await this.db.NIK(`SELECT * from usuario where documento = ?`,[documento])
       return result
    }
 
    async getDepuracion(){
        return await this.db.NIK('delete from notificaciones WHERE fecha_creacion < DATE_SUB(NOW(), INTERVAL 15 DAY)')
    }

    async getCreateArticle(data){
        const res:any =  await this.db.NIK('select categoria.base_id from categoria where categoria.id = ?',[data.category])

        const newData = { ...data,base_id:res[0].base_id }

        const { title, creator, base_id } = newData
     
        const user:any = await this.db.NIK('select id from usuario where documento = ?',[creator])
        
       const notificacion_id:any = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [ 
            user[0].id, 
            title,
            1,
            data.id
          ])  
  
        await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ',[base_id, notificacion_id[0].id])

        const respuesta = await this.db.NIK('call notificaciones_get(?)',[creator])

        const datos = respuesta[0]  
        return datos
    }

    async getUpdateArticle(data){
        const article:any = await  this.db.NIK('select * from articulo where id=?',[data.id])
        const { title, base_id } = article[0]

        const user:any = await this.db.NIK('select id from usuario where documento = ?',[data.creator])
    
        const notificacion_id:any = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [ 
          user[0].id, 
          title,
          2,
          data.id
        ])

        
      await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ',[base_id, notificacion_id[0].id])

      const respuesta = await this.db.NIK('call notificaciones_get(?)',[data.creator])

      const datos = respuesta[0]  
      return datos

    }

    async getComment(data){
      const article:any = await  this.db.NIK('select * from articulo where id=?',[data.id])

      const {  base_id } = article[0]

      const user:any = await this.db.NIK('select id from usuario where documento = ?',[data.creator])
      
      const notificacion_id:any = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [ 
        user[0].id, 
        data.title,
        4,
        data.id
      ])

      await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ',[base_id, notificacion_id[0].id])

      const respuesta = await this.db.NIK('call notificaciones_get(?)',[data.creator])

      const datos = respuesta[0]  
      return datos
    }

    async getActive(){
      return await this.db.NIK('select * from notificaciones_verificar')
    }

    async deleteNotificaciones(id){
      return await this.db.NIK('DELETE FROM notificaciones where articulo_id=?',[id])
    }


} 