import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {  Socket } from "socket.io";
import { DbService } from "../databases/db.service";


interface Base {
  base_id:number
}

@WebSocketGateway()
export class SocketGateway {

    @WebSocketServer() socket:Socket

    constructor(private db:DbService){}
 
        @SubscribeMessage('event')
        handleMessage(@MessageBody() message:string){
          this.socket.emit('message', message) 
        }
    
        @SubscribeMessage('articulosave')
        async handleArticuloSave(client:Socket, data:any){
      
          const res:any =  await this.db.NIK('select categoria.base_id from categoria where categoria.id = ?',[data.category])

          const newData = { ...data,base_id:res[0].base_id }

          const { title, creator, base_id } = newData
       
          const user:any = await this.db.NIK('select id from usuario where documento = ?',[ creator ])
          

         const notificacion_id:any = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [ 
              user[0].id, 
              title,
              1,
              data.id
            ]) 
    
            
          await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ',[base_id, notificacion_id[0].id])

          const respuesta = await this.db.NIK('call notificaciones_get(?)',[creator])

          const datos = respuesta[0]  
          return client.broadcast.emit('responsearticulosave', datos) 
        } 
 
        @SubscribeMessage('articuloedit')
        async handleArticuloEdit(client:Socket ,  data:any){
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

          client.broadcast.emit('responsearticuloedit', datos)
        }

       

        @SubscribeMessage('comentario')
       async  handleComentarionRespuesta(client:Socket, data){

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

          client.broadcast.emit('respuestacomentario',datos)
        }

      }

