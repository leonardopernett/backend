import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";
const { convertDeltaToHtml } = require('node-quill-converter');
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

@Injectable()
export class ControlCambiosModelService {

    constructor(
        private db:DbService
        ) { }

        async mostrarcontroldecambio(idarticulo){

          let [data]=await this.db.nikcleanPoolConection.query(`SELECT a.id,a.date ,a.title,b.user_name FROM cambio_articulo a 
          JOIN usuario b ON a.usuario_id=b.documento
          WHERE a.articulo_id=?
          GROUP BY a.date `,[idarticulo])
    
          return data
    
        }

        async cambioselect(idarticulo){

          let [data]=await this.db.nikcleanPoolConection.query(`SELECT a.id,a.date as date_old,a.title AS title_old,b.user_name AS username FROM cambio_articulo a 
          JOIN usuario b ON a.usuario_id=b.documento
          JOIN articulo c ON c.id=a.articulo_id
          WHERE a.articulo_id=?
          GROUP BY a.date`,[idarticulo])
    
          return data

        }

        async mostrarcambio(idcambio){

          let [data]:any=await this.db.nikcleanPoolConection.query(`SELECT a.date as date_old,a.title AS title_old,a.contenido AS content_old,b.user_name,c.title AS title_new,c.obj as content_new,c.modification_date AS date_new FROM cambio_articulo a 
JOIN usuario b ON a.usuario_id=b.documento
JOIN articulo c ON c.id=a.articulo_id
WHERE a.id=?`,[idcambio])

            let datos = data.map(item => {
            return {
              date_old: item.date_old,
              title_old: item.title_old,
              content_old: this.convertirDelta(data[0].content_old),
              user_name: item.user_name,
              title_new: item.title_new,
              content_new: this.convertirDelta(data[0].content_new),
              date_new: item.date_new
            }
          });

          return datos;

        }

        convertirDelta(delta){

          let json = JSON.parse(delta);
          let array = json.ops;
          var cfg = {};
          var converter = new QuillDeltaToHtmlConverter(array, cfg);
          var html = converter.convert(); 
          return html

        }
  
} 

