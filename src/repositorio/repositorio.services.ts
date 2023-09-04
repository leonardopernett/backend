import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3'
import {DbService} from '../databases/db.service'


@Injectable()
export class RepositorioServices {
 
    constructor(private db:DbService){}
 
    async saveReposit(file){
       
        let comentario = await this.db.NIK('CALL agregar_documento(?,?,?,?,?,?,?)',[
            file.nombre_archivo,file.extension,file.peso,file.documento_creador, file.s3_name, file.id_articulo, file.url]);
        return comentario

    }
    async getRePositoryId(id){
        return await this.db.NIK('CALL get_documentos(?)',[id])
    }

    async deleteBorrador(id, user){
      
        return await this.db.NIK('CALL eliminar_documento(?,?)',[user, id])
    }
}