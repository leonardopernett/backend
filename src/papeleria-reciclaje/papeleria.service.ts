import { Delete, Injectable, Param } from '@nestjs/common';
import { DbService } from '../databases/db.service';


@Injectable()
export class PapeleriaService {

constructor(private db:DbService){}

async getAllArticledelete(){
    const articles = await this.db.NIK(`SELECT id, content, obj, state, title, created, pcrc, type, categoria_id, base_id, es_id, user_name FROM papeleria_reciclajes
    INNER JOIN dp_pcrc ON dp_pcrc.id_dp_pcrc = papeleria_reciclajes.base_id order by id desc`)
    return articles

}

async deleteArticlePermanent(id:any){
    return await this.db.NIK('delete from papeleria_reciclajes where id = ?',[ id ]) 
}

async depuracionPapeleriaReciclaje(){
    await this.db.NIK('DELETE from papeleria_reciclajes p WHERE p.created < DATE_ADD(CURDATE(), INTERVAL - 30 day)');
}


}  