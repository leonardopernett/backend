import { Injectable } from '@nestjs/common';
import { Length } from 'class-validator';
import { DbService } from "../databases/db.service";
import { commentRaw } from "./entities";
import { map } from 'async';

  
export class commentDTO {

    replyTo: string

    @Length(2, 2000)
    text: string
}
 
@Injectable()
export class CommentsModelService {
 
    constructor(
        private db:DbService,
    ) { }

    getComments = async (articleId: string) => {
        let comentarios = await this.db.NIK<commentRaw>('CALL get_comment_replie(?)',[ articleId ])

        return comentarios

    }

    postComment = async (replyTo:string, text:string, articleId: string, userId: string) => {
       
        let [nuevo_comentario] = await this.db.NIK<commentRaw>('CALL agregar_comentario(?, ?, ?, ?)',[ articleId, userId, replyTo, text ])

        let [{nombre_completo}] = await this.db.NIK(`
        select user_name as nombre_completo
        from usuario a
        where a.documento = ?;
            `,[nuevo_comentario.user_id])
            
        return {
            ...nuevo_comentario,
            username: nombre_completo,
            
        }

    }

    getRepliesTo = async (replyTo: string, from: string = '0', size: string = '10') => {
        let respuestas = await this.db.NIK<commentRaw>('CALL get_comment_replies(?,?,?)',[replyTo, from, size])

        let respuestasCompletas = await map(respuestas, async (respuesta) => {
            let [{nombre_completo}] = await this.db.NIK(`
            select user_name as nombre_completo
            from usuario a
            where a.documento = ?;
            `,[respuesta.user_id]) 

            return { 
                ...respuesta,
                username: nombre_completo,
                replies: []
            }
        })

        return respuestasCompletas

    }

    public async deleteReplies(id){
        let result = await this.db.NIK(`call borrar_replaycomentario(?)`,[id])
        return result;

    } 

    public async deleteComment(id, cedula){
/*         let comment:any = await this.db.NIK('select * from comentario where id = ?',[id])
        let reply = await this.db.NIK('SELECT * FROM comentario WHERE articulo_id = ? AND  reply_to IS NOT null',[idArticulo]) */
     
        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);

        let [[data]]:any=await this.db.nikcleanPoolConection.query('SELECT * FROM comentario WHERE id=?',[id])
                         await this.db.nikcleanPoolConection.query('INSERT INTO borrar_comentario_log (id_comentario,comentario,documento,articulo_id,fecha_eliminacion) VALUES (?,?,?,?,?)',[id,data.text,cedula,data.articulo_id,hoy.toISOString()])

                        let result = await this.db.NIK(`call borrar_comentario(?)`,[id])
                        return result;  
      
    }

    public async deleteComments(id){

        let result = await this.db.NIK(`call borrar_comentarios(?)`,[id])
        return result;

    }

}