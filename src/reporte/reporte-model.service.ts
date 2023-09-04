import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service"
import * as XLSX from 'xlsx'
import { resolve } from 'path';

import * as S3  from 'aws-sdk/clients/s3'
import * as fs from 'fs'
import  {unlink} from 'fs-extra'


type ResultSetHeader = {
    fieldCount?: number,
    affectedRows?: number,
    insertId<T>(x:T):number | undefined,
    info?: string,
    serverStatus?: number,
    warningStatus?: number
}



@Injectable()
export class ReportsModelService {


    private s3Client = new S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey:process.env.ACCESS_KEY,
      region: 'us-east-1',
      sslEnabled:false
      })


    constructor(
        private db:DbService
    ) { }

    ////////INICIO RUTAS PARA CREAR EXCEL POR PCRC//////////////

    public async getReportLecturaLimit(ini,fin,idpcrc,limite,pag){
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,
        articulo.title as titulo ,
        vista.usuario_id as cedula ,
        usuario.user_name as nombre ,
        DATE_FORMAT(vista.initial_date,'%m/%d/%Y %H:%i')as initial_date , 
        articulo.type as tipo, categoria.name as categoria,
        TIMEDIFF(vista.final_date,vista.initial_date) as rebote
        FROM vista 
        INNER JOIN articulo ON vista.articulo_id=articulo.id 
        JOIN usuario ON vista.usuario_id=usuario.documento
        INNER JOIN categoria ON categoria.id=articulo.categoria_id 
        WHERE articulo.base_id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])
        
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'ID', key: 'id' },
          { header: 'Título', key: 'titulo' },
          { header: 'Cédula', key: 'cedula' },
          { header: 'Nombre', key: 'nombre' },
          { header: 'Fecha inicial', key: 'initial_date' },
          { header: 'Tipo', key: 'tipo' },
          { header: 'Categoría', key: 'categoria' },
          { header: 'Rebote', key: 'rebote' },
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer();
      }

      public async getReportComentarioLimit(ini,fin,idpcrc,limite,pag){
        let result = await this.db.NIKSLAVE(`
        SELECT 
        articulo.id,
        articulo.title as titulo ,
        DATE_FORMAT(comentario.publication_date,'%d/%m/%Y') as fecha ,
        categoria.name as categoria ,
        comentario.user_id as cedula, 
        usuario.user_name as publicador ,
        comentario.text as comentarios 
        FROM comentario 
        INNER JOIN articulo on comentario.articulo_id = articulo.id 
        INNER JOIN usuario on comentario.user_id = usuario.documento 
        INNER JOIN categoria on categoria.id = articulo.categoria_id 
        where articulo.base_id= ? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])
        
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'ID', key: 'id' },
          { header: 'Título', key: 'titulo' },
          { header: 'Cédula', key: 'cedula' },
          { header: 'Categoria', key: 'categoria' },
          { header: 'Fecha', key: 'fecha' },
          { header: 'Publicador', key: 'publicador' },
          { header: 'Comentario', key: 'comentarios' },
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer();
      }

      public async getReportBaseDatosLimit(ini,fin,idpcrc,limite,pag){
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo,
(SELECT count(vista.id) FROM vista WHERE vista.articulo_id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as vista,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as util,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as no_util,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceUtilidad,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceNoUtilidad,
((((SELECT count(*)
FROM vista 
INNER JOIN articulo a ON vista.articulo_id=a.id
WHERE a.id=articulo.id AND TIMEDIFF(vista.final_date,vista.initial_date)<'00:00:10' AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))/(SELECT count(*)
FROM vista 
INNER JOIN articulo b  ON vista.articulo_id=b.id
WHERE b.id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))*100) AS tasarebote,
(SELECT count(favorito.id) FROM favorito WHERE favorito.articulo_id=articulo.id AND ISNULL(favorito.final_date) AND DATE_FORMAT(favorito.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as favorito,
(SELECT count(comentario.id) FROM comentario WHERE comentario.articulo_id=articulo.id AND DATE_FORMAT(comentario.publication_date,'%Y/%m/%d') BETWEEN ? AND ?) as comentario
FROM articulo
WHERE articulo.base_id=? LIMIT ? OFFSET ?`,[ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,idpcrc,limite,pag])
       
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'ID', key: 'id' },
          { header: 'Título', key: 'titulo' },
          { header: 'Vistas', key: 'vista' },
          { header: 'Util', key: 'util' },
          { header: 'No Util', key: 'no_util' },
          { header: 'Indice De Utilidad', key: 'indiceUtilidad' },
          { header: 'Indice De No Utilidad', key: 'indiceNoUtilidad' },
          { header: 'Tasa De Rebote', key: 'tasarebote' },
          { header: 'Favorito', key: 'favorito' },
          { header: 'Comentario', key: 'comentario' }
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer(); 
      }

      public async getReportCambioLimit(ini,fin,idpcrc,limite,pag){
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo, tipoevento.evento, DATE_FORMAT(tipoevento.fecha_evento,'%d/%m/%Y')  as fecha ,categoria.name as categoria ,usuario.documento,usuario.user_name as usuarios
        FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
        INNER JOIN categoria ON categoria.id=articulo.categoria_id
        JOIN usuario ON usuario.documento=tipoevento.id_user
        WHERE articulo.base_id=? 
        AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])
       
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'ID', key: 'id' },
          { header: 'Título', key: 'titulo' },
          { header: 'Evento', key: 'evento' },
          { header: 'Fecha', key: 'fecha' },
          { header: 'Categoria', key: 'categoria' },
          { header: 'Documento', key: 'documento' },
          { header: 'Usuarios', key: 'usuarios' }
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer(); 
      }

      public async getReportUsuarioLimit(idpcrc,limite,pag){
        let result = await this.db.NIKSLAVE(`
        SELECT usuario.documento,usuario.user_name as usuarios ,usuario.creation_date as fecha_creacion ,usuario.rol 
        FROM usuario
        JOIN usuario_base ON usuario_base.documento=usuario.documento
        JOIN dp_pcrc ON dp_pcrc.id_dp_pcrc=usuario_base.base_id
        WHERE dp_pcrc.id_dp_pcrc=? LIMIT ? OFFSET ?`,[idpcrc,limite,pag])
       
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'Documento', key: 'documento' },
          { header: 'Usuario', key: 'usuarios' },
          { header: 'Fecha De Creacion', key: 'fecha_creacion' },
          { header: 'Rol', key: 'rol' }
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer(); 
      }

      public async getReportFinancieraLimit(ini,fin){
        let result = await this.db.NIKSLAVE(`
        SELECT
        pcrc,
        (SELECT dp_clientes_nik.nombre FROM dp_clientes_nik WHERE dp_clientes_nik.id_clientes=dp_pcrc_nik.base_id) AS cliente,
        (SELECT count(1) FROM articulo WHERE articulo.base_id=dp_pcrc_nik.id_dp_pcrc GROUP BY articulo.base_id) as cantidad_articulos,
        (SELECT count(1) FROM vista JOIN articulo ON articulo.id=vista.articulo_id WHERE articulo.base_id=dp_pcrc_nik.id_dp_pcrc AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND LAST_DAY(?) GROUP BY articulo.base_id) as cantidad_vistas
        FROM dp_pcrc_nik
        UNION
        SELECT
        pcrc,
        (SELECT dp_clientes.cliente FROM dp_clientes WHERE dp_clientes.id_dp_clientes=dp_pcrc.id_dp_clientes) AS cliente,
        (SELECT count(1) FROM articulo WHERE articulo.base_id=dp_pcrc.id_dp_pcrc GROUP BY articulo.base_id) as cantidad_articulos,
        (SELECT count(1) FROM vista JOIN articulo ON articulo.id=vista.articulo_id WHERE articulo.base_id=dp_pcrc.id_dp_pcrc AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND LAST_DAY(?) GROUP BY articulo.base_id) as cantidad_vistas
        FROM dp_pcrc`,[ini,fin,ini,fin])
       
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'PCRC', key: 'pcrc' },
          { header: 'Cliente', key: 'cliente' },
          { header: 'Cantidad Articulos', key: 'cantidad_articulos' },
          { header: 'Cantidad Vistas', key: 'cantidad_vistas' }
        ];
      
        worksheet.addRows(result);
      
        return await workbook.xlsx.writeBuffer(); 
      }

      public async getReportObligatorioLimit(idpcrc,fechaini,fechafinal,usuarios,limite,pag){

        let data:any=await this.db.NIKSLAVE(`SELECT a.user_name,a.documento,h.fecha_vista,f.titulo AS titulo_periodo,s.title AS titulo_articulo FROM articulos_obligatorio_usuario h
        JOIN articulos_obligatorios f ON f.id=h.id_periodo
        JOIN articulo s ON s.id=f.id_articulo
        JOIN usuario a ON a.id=h.id_usuario
        JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
        WHERE b.id_pcrc=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?
        LIMIT ? OFFSET ?`,[idpcrc,fechaini,fechafinal,limite,pag])

        if(usuarios==1){

        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'Documento', key: 'documento' },
          { header: 'Usuario', key: 'user_name' },
          { header: 'Fecha De Vista', key: 'fecha_vista' },
          { header: 'Titulo Obligatoriedad', key: 'titulo_periodo' },
          { header: 'Titulo Articulo', key: 'titulo_articulo' }
        ];
      
        worksheet.addRows(data);
      
        return await workbook.xlsx.writeBuffer();

        }else{

            let usuariosexist=[]

            data.forEach(element => {
                usuariosexist.push(element.documento)
            });

            let result = usuariosexist.filter((item,index)=>{
                return usuariosexist.indexOf(item) === index;
              })

              let datos=await this.db.NIKSLAVE(`SELECT a.documento,a.user_name AS nombre_completo FROM usuario a
              JOIN usuario_base b ON b.documento=a.documento
              WHERE b.base_id=? AND a.documento NOT IN (?) LIMIT ? OFFSET ?`,[idpcrc,result.join(),limite,pag])

              const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
      
        worksheet.columns = [
          { header: 'Documento', key: 'documento' },
          { header: 'Usuario', key: 'nombre_completo' }
        ];
      
        worksheet.addRows(datos);
      
        return await workbook.xlsx.writeBuffer();

        }

        

}

       ////////FIN RUTAS PARA CREAR EXCEL POR PCRC//////////////

        ////////INICIO RUTAS PARA CREAR EXCEL POR CATEGORIA//////////////

        public async getReportLecturaCategoriaLimit(ini,fin,idcategoria,limite,pag){
            let result = await this.db.NIKSLAVE(`
            SELECT articulo.id,
            articulo.title as titulo ,
            vista.usuario_id as cedula ,
            usuario.user_name as nombre ,
            DATE_FORMAT(vista.initial_date,'%m/%d/%Y %H:%i')as initial_date , 
            articulo.type as tipo, categoria.name as categoria,
            TIMEDIFF(vista.final_date,vista.initial_date) as rebote
            FROM vista 
            INNER JOIN articulo ON vista.articulo_id=articulo.id 
            JOIN usuario ON vista.usuario_id=usuario.documento
            INNER JOIN categoria ON categoria.id=articulo.categoria_id 
            WHERE articulo.categoria_id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idcategoria,ini,fin,limite,pag])
            
            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'ID', key: 'id' },
              { header: 'Título', key: 'titulo' },
              { header: 'Cédula', key: 'cedula' },
              { header: 'Nombre', key: 'nombre' },
              { header: 'Fecha inicial', key: 'initial_date' },
              { header: 'Tipo', key: 'tipo' },
              { header: 'Categoría', key: 'categoria' },
              { header: 'Rebote', key: 'rebote' },
            ];
          
            worksheet.addRows(result);
          
            return await workbook.xlsx.writeBuffer();
          }


          public async getReportBaseDatosCategoriaLimit(ini,fin,idcategoria,limite,pag){
            let result = await this.db.NIKSLAVE(`
            SELECT articulo.id,articulo.title as titulo,
    (SELECT count(vista.id) FROM vista WHERE vista.articulo_id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as vista,
    (SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as util,
    (SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as no_util,
    (((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceUtilidad,
    (((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceNoUtilidad,
    ((((SELECT count(*)
    FROM vista 
    INNER JOIN articulo a ON vista.articulo_id=a.id
    WHERE a.id=articulo.id AND TIMEDIFF(vista.final_date,vista.initial_date)<'00:00:10' AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))/(SELECT count(*)
    FROM vista 
    INNER JOIN articulo b  ON vista.articulo_id=b.id
    WHERE b.id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))*100) AS tasarebote,
    (SELECT count(favorito.id) FROM favorito WHERE favorito.articulo_id=articulo.id AND ISNULL(favorito.final_date) AND DATE_FORMAT(favorito.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as favorito,
    (SELECT count(comentario.id) FROM comentario WHERE comentario.articulo_id=articulo.id AND DATE_FORMAT(comentario.publication_date,'%Y/%m/%d') BETWEEN ? AND ?) as comentario
    FROM articulo
    WHERE articulo.categoria_id=? LIMIT ? OFFSET ?`,[ini,fin,ini,fin,ini,fin,
        ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,
        ini,fin,ini,fin,ini,fin,ini,fin,idcategoria,limite,pag])
           
            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'ID', key: 'id' },
              { header: 'Título', key: 'titulo' },
              { header: 'Vistas', key: 'vista' },
              { header: 'Util', key: 'util' },
              { header: 'No Util', key: 'no_util' },
              { header: 'Indice De Utilidad', key: 'indiceUtilidad' },
              { header: 'Indice De No Utilidad', key: 'indiceNoUtilidad' },
              { header: 'Tasa De Rebote', key: 'tasarebote' },
              { header: 'Favorito', key: 'favorito' },
              { header: 'Comentario', key: 'comentario' }
            ];
          
            worksheet.addRows(result);
          
            return await workbook.xlsx.writeBuffer(); 
          }

          public async getReportComentariocategoriaLimit(ini,fin,idcategoria,limite,pag){
            let result = await this.db.NIKSLAVE(`
            SELECT 
            articulo.id,
            articulo.title as titulo ,
            DATE_FORMAT(comentario.publication_date,'%d/%m/%Y') as fecha ,
            categoria.name as categoria ,
            comentario.user_id as cedula, 
            usuario.user_name as publicador ,
            comentario.text as comentarios 
            FROM comentario 
            INNER JOIN articulo on comentario.articulo_id = articulo.id 
            INNER JOIN usuario on comentario.user_id = usuario.documento 
            INNER JOIN categoria on categoria.id = articulo.categoria_id 
            where articulo.categoria_id= ? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idcategoria,ini,fin,limite,pag])
            
            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'ID', key: 'id' },
              { header: 'Título', key: 'titulo' },
              { header: 'Cédula', key: 'cedula' },
              { header: 'Categoria', key: 'categoria' },
              { header: 'Fecha', key: 'fecha' },
              { header: 'Publicador', key: 'publicador' },
              { header: 'Comentario', key: 'comentarios' },
            ];
          
            worksheet.addRows(result);
          
            return await workbook.xlsx.writeBuffer();
          }

          public async getReportCambioCategoriaLimit(ini,fin,id,limite,pag){
            let result = await this.db.NIKSLAVE(`
            SELECT articulo.id,articulo.title as titulo, tipoevento.evento, DATE_FORMAT(tipoevento.fecha_evento,'%d/%m/%Y')  as fecha ,categoria.name as categoria ,usuario.documento,usuario.user_name as usuarios
            FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
            INNER JOIN categoria ON categoria.id=articulo.categoria_id
            JOIN usuario ON usuario.documento=tipoevento.id_user
            WHERE articulo.categoria_id=? 
            AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[id,ini,fin,limite,pag])
           
            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'ID', key: 'id' },
              { header: 'Título', key: 'titulo' },
              { header: 'Evento', key: 'evento' },
              { header: 'Fecha', key: 'fecha' },
              { header: 'Categoria', key: 'categoria' },
              { header: 'Documento', key: 'documento' },
              { header: 'Usuarios', key: 'usuarios' }
            ];
          
            worksheet.addRows(result);
          
            return await workbook.xlsx.writeBuffer(); 
          }

          public async getReportObligatorioCategoriaLimit(idpcrc,fechaini,fechafinal,usuarios,limite,pag,idcategoria){

            let data:any=await this.db.NIKSLAVE(`SELECT a.user_name,a.documento,h.fecha_vista,f.titulo AS titulo_periodo,s.title AS titulo_articulo FROM articulos_obligatorio_usuario h
            JOIN articulos_obligatorios f ON f.id=h.id_periodo
            JOIN articulo s ON s.id=f.id_articulo
            JOIN usuario a ON a.id=h.id_usuario
            JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
            WHERE s.categoria_id=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?
            LIMIT ? OFFSET ?`,[idcategoria,fechaini,fechafinal,limite,pag])
    
            if(usuarios==1){
    
            const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'Documento', key: 'documento' },
              { header: 'Usuario', key: 'user_name' },
              { header: 'Fecha De Vista', key: 'fecha_vista' },
              { header: 'Titulo Obligatoriedad', key: 'titulo_periodo' },
              { header: 'Titulo Articulo', key: 'titulo_articulo' }
            ];
          
            worksheet.addRows(data);
          
            return await workbook.xlsx.writeBuffer();
    
            }else{
    
                let usuariosexist=[]
    
                data.forEach(element => {
                    usuariosexist.push(element.documento)
                });
    
                let result = usuariosexist.filter((item,index)=>{
                    return usuariosexist.indexOf(item) === index;
                  })
    
                  let datos=await this.db.NIKSLAVE(`SELECT a.documento,a.user_name AS nombre_completo FROM usuario a
                  JOIN usuario_base b ON b.documento=a.documento
                  WHERE b.base_id=? AND a.documento NOT IN (?) LIMIT ? OFFSET ?`,[idpcrc,result.join(),limite,pag])
    
                  const Excel = require('exceljs');
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
          
            worksheet.columns = [
              { header: 'Documento', key: 'documento' },
              { header: 'Usuario', key: 'nombre_completo' }
            ];
          
            worksheet.addRows(datos);
          
            return await workbook.xlsx.writeBuffer();
    
            }
    
            
    
    }

        ////////FIN RUTAS PARA CREAR EXCEL POR CATEGORIA//////////////

        /////////INICIO FUNCION DE LECTURAS////////////

      public async getReportLecturaPcrc(ini,fin,idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,
        articulo.title as titulo ,
        vista.usuario_id as cedula ,
        usuario.user_name as nombre ,
        DATE_FORMAT(vista.initial_date,'%m/%d/%Y %H:%i')as initial_date , 
        articulo.type as tipo, categoria.name as categoria,
        TIMEDIFF(vista.final_date,vista.initial_date) as rebote
        FROM vista 
        INNER JOIN articulo ON vista.articulo_id=articulo.id 
        JOIN usuario ON vista.usuario_id=usuario.documento
        INNER JOIN categoria ON categoria.id=articulo.categoria_id 
        WHERE articulo.base_id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])

        return result;
    }

    public async getLecturaTotal(ini,fin,idpcrc){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT 
        count(*) as total_lecturas
        FROM vista 
        INNER JOIN articulo ON vista.articulo_id=articulo.id
        WHERE articulo.base_id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ?`,[idpcrc,ini,fin])

        let data=await this.Paginatotal(result[0].total_lecturas,limite)
        let data2=await this.Paginatotalexcel(result[0].total_lecturas,limite2)
       
        return {"total_lecturas":data,"total_exportar":data2}

    }

    public async getLecturaCategoria(ini,fin,idcategoria){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) AS total_lecturas
        FROM vista 
        INNER JOIN articulo ON vista.articulo_id=articulo.id 
        JOIN usuario ON vista.usuario_id=usuario.documento
        INNER JOIN categoria ON categoria.id=articulo.categoria_id 
        WHERE categoria.id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ?`,[idcategoria,ini,fin])

        
        let data=await this.Paginatotal(result[0].total_lecturas,limite)
        let data2=await this.Paginatotalexcel(result[0].total_lecturas,limite2)
       
        return {"total_lecturas":data,"total_exportar":data2}

    }

    public async getReportLecturaCategoria(ini,fin,idcategoria,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,
        articulo.title as titulo ,
        vista.usuario_id as cedula ,
        usuario.user_name as nombre ,
        DATE_FORMAT(vista.initial_date,'%m/%d/%Y %H:%i')as initial_date , 
        articulo.type as tipo, categoria.name as categoria,
        TIMEDIFF(vista.final_date,vista.initial_date) as rebote
        FROM vista 
        INNER JOIN articulo ON vista.articulo_id=articulo.id 
        JOIN usuario ON vista.usuario_id=usuario.documento
        INNER JOIN categoria ON categoria.id=articulo.categoria_id 
        WHERE categoria.id=? AND DATE_FORMAT(vista.initial_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idcategoria,ini,fin,limite,pag])

        return result;
    }

    /////////FIN FUNCION DE LECTURAS////////////

    /////////INICIO FUNCION DE COMENTARIOS////////////

    public async getReportComentarioPcrc(ini,fin,idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT 
articulo.id,
articulo.title as titulo ,
DATE_FORMAT(comentario.publication_date,'%d/%m/%Y') as fecha ,
categoria.name as categoria ,
comentario.user_id as cedula, 
usuario.user_name as publicador ,
comentario.text as comentarios,
categoria.name  
FROM comentario 
INNER JOIN articulo on comentario.articulo_id = articulo.id 
INNER JOIN usuario on comentario.user_id = usuario.documento 
INNER JOIN categoria on categoria.id = articulo.categoria_id 
where articulo.base_id=? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])

        return result;
    }

    public async getReportComentarioCategoria(ini,fin,idcategoria,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT 
articulo.id,
articulo.title as titulo ,
DATE_FORMAT(comentario.publication_date,'%d/%m/%Y') as fecha ,
categoria.name as categoria ,
comentario.user_id as cedula, 
usuario.user_name as publicador ,
comentario.text as comentarios,
categoria.name  
FROM comentario 
INNER JOIN articulo on comentario.articulo_id = articulo.id 
INNER JOIN usuario on comentario.user_id = usuario.documento 
INNER JOIN categoria on categoria.id = articulo.categoria_id 
where articulo.categoria_id=? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idcategoria,ini,fin,limite,pag])

        return result;
    }

    public async getComentarioTotal(ini,fin,idpcrc){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT
        COUNT(*) AS total_comentarios  
FROM comentario 
INNER JOIN articulo on comentario.articulo_id = articulo.id 
INNER JOIN usuario on comentario.user_id = usuario.documento 
INNER JOIN categoria on categoria.id = articulo.categoria_id 
where articulo.base_id=? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ?`,[idpcrc,ini,fin])

        let data=await this.Paginatotal(result[0].total_comentarios,limite)
        let data2=await this.Paginatotalexcel(result[0].total_comentarios,limite2)
       
        return {"total_comentario":data,"total_exportar":data2}

    }

    public async getComentarioCategoriaTotal(ini,fin,idcategoria){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT
        COUNT(*) AS total_comentarios  
FROM comentario 
INNER JOIN articulo on comentario.articulo_id = articulo.id 
INNER JOIN usuario on comentario.user_id = usuario.documento 
INNER JOIN categoria on categoria.id = articulo.categoria_id 
where articulo.categoria_id=? AND DATE_FORMAT(comentario.publication_date,'%Y-%m-%d') BETWEEN ? AND ?`,[idcategoria,ini,fin])

        let data=await this.Paginatotal(result[0].total_comentarios,limite)
        let data2=await this.Paginatotalexcel(result[0].total_comentarios,limite2)
       
        return {"total_comentario":data,"total_exportar":data2}

    }

    /////////FIN FUNCION DE COMENTARIOS////////////

    /////////INICIO FUNCION DE BASE DE DATOS////////////

    public async getReportBaseDatosPcrc(ini,fin,idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo,
(SELECT count(vista.id) FROM vista WHERE vista.articulo_id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as vista,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as util,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as no_util,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceUtilidad,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceNoUtilidad,
((((SELECT count(*)
FROM vista 
INNER JOIN articulo a ON vista.articulo_id=a.id
WHERE a.id=articulo.id AND TIMEDIFF(vista.final_date,vista.initial_date)<'00:00:10' AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))/(SELECT count(*)
FROM vista 
INNER JOIN articulo b  ON vista.articulo_id=b.id
WHERE b.id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))*100) AS tasarebote,
(SELECT count(favorito.id) FROM favorito WHERE favorito.articulo_id=articulo.id AND ISNULL(favorito.final_date) AND DATE_FORMAT(favorito.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as favorito,
(SELECT count(comentario.id) FROM comentario WHERE comentario.articulo_id=articulo.id AND DATE_FORMAT(comentario.publication_date,'%Y/%m/%d') BETWEEN ? AND ?) as comentario
FROM articulo
WHERE articulo.base_id=? LIMIT ? OFFSET ?`,[ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,idpcrc,limite,pag])

        return result;
    }

    public async getReportBaseDatosCategoria(ini,fin,categoria,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo,
(SELECT count(vista.id) FROM vista WHERE vista.articulo_id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as vista,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as util,
(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?) as no_util,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceUtilidad,
(((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)/((SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="dislike" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?)+(SELECT count(valoraciones.tipo_valoracion) FROM valoraciones WHERE valoraciones.articulo_id=articulo.id AND valoraciones.tipo_valoracion="like" AND ISNULL(valoraciones.final_date) AND DATE_FORMAT(valoraciones.creation_date,'%Y/%m/%d') BETWEEN ? AND ?))*100)) AS indiceNoUtilidad,
((((SELECT count(*)
FROM vista 
INNER JOIN articulo a ON vista.articulo_id=a.id
WHERE a.id=articulo.id AND TIMEDIFF(vista.final_date,vista.initial_date)<'00:00:10' AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))/(SELECT count(*)
FROM vista 
INNER JOIN articulo b  ON vista.articulo_id=b.id
WHERE b.id=articulo.id AND DATE_FORMAT(vista.initial_date,'%Y/%m/%d') BETWEEN ? AND ?))*100) AS tasarebote,
(SELECT count(favorito.id) FROM favorito WHERE favorito.articulo_id=articulo.id AND ISNULL(favorito.final_date) AND DATE_FORMAT(favorito.initial_date,'%Y/%m/%d') BETWEEN ? AND ?) as favorito,
(SELECT count(comentario.id) FROM comentario WHERE comentario.articulo_id=articulo.id AND DATE_FORMAT(comentario.publication_date,'%Y/%m/%d') BETWEEN ? AND ?) as comentario
FROM articulo
WHERE articulo.categoria_id=? LIMIT ? OFFSET ?`,[ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,ini,fin,
    ini,fin,ini,fin,ini,fin,ini,fin,categoria,limite,pag])

        return result;
    }

    public async getBaseDatosTotal(idpcrc){

        const limite=5;
        const limite2=500;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) AS total_base
        FROM articulo
        WHERE articulo.base_id=?`,[idpcrc])

        let data=await this.Paginatotal(result[0].total_base,limite)
        let data2=await this.Paginatotalexcel(result[0].total_base,limite2)
       
        return {"total_base":data,"total_exportar":data2}

    }

    public async getBaseDatosCategoriaTotal(idcategoria){

        const limite=5;
        const limite2=500;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) AS total_base
FROM articulo
WHERE articulo.categoria_id=?`,[idcategoria])

        let data=await this.Paginatotal(result[0].total_base,limite)
        let data2=await this.Paginatotalexcel(result[0].total_base,limite2)
       
        return {"total_base":data,"total_exportar":data2}

    }

    /////////FIN FUNCION DE BASE DE DATOS////////////

    //////////INICIO FUNCION DE CAMBIOS///////////

    public async getReportCambioPcrc(ini,fin,idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo, tipoevento.evento, DATE_FORMAT(tipoevento.fecha_evento,'%d/%m/%Y')  as fecha ,categoria.name as categoria ,usuario.documento,usuario.user_name as usuarios
FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
INNER JOIN categoria ON categoria.id=articulo.categoria_id
JOIN usuario ON usuario.documento=tipoevento.id_user
WHERE articulo.base_id=? 
AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[idpcrc,ini,fin,limite,pag])

        return result;
    }

    public async getReportCambioCategoria(ini,fin,categoria,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT articulo.id,articulo.title as titulo, tipoevento.evento, DATE_FORMAT(tipoevento.fecha_evento,'%d/%m/%Y')  as fecha ,categoria.name as categoria ,usuario.documento,usuario.user_name as usuarios
FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
INNER JOIN categoria ON categoria.id=articulo.categoria_id
JOIN usuario ON usuario.documento=tipoevento.id_user
WHERE articulo.categoria_id=? 
AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ? LIMIT ? OFFSET ?`,[categoria,ini,fin,limite,pag])

        return result;
    }

    public async getCambioTotal(ini,fin,idpcrc){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) AS total_cambio
        FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
        INNER JOIN categoria ON categoria.id=articulo.categoria_id
        JOIN usuario ON usuario.documento=tipoevento.id_user
        WHERE articulo.base_id=? 
        AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ?`,[idpcrc,ini,fin])

        let data=await this.Paginatotal(result[0].total_cambio,limite)
        let data2=await this.Paginatotalexcel(result[0].total_cambio,limite2)
       
        return {"total_cambio":data,"total_exportar":data2}

    }

    public async getCambioCategoriaTotal(ini,fin,idcategoria){

        const limite=5;
        const limite2=100000;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) AS total_cambio
        FROM tipoevento JOIN articulo ON articulo.id=tipoevento.id_articulo
        INNER JOIN categoria ON categoria.id=articulo.categoria_id
        JOIN usuario ON usuario.documento=tipoevento.id_user
        WHERE articulo.categoria_id=? 
        AND DATE_FORMAT(tipoevento.fecha_evento,'%Y-%m-%d') BETWEEN ? AND ?`,[idcategoria,ini,fin])

        let data=await this.Paginatotal(result[0].total_cambio,limite)
        let data2=await this.Paginatotalexcel(result[0].total_cambio,limite2)
       
        return {"total_cambio":data,"total_exportar":data2}

    }

    /////////FIN FUNCION DE CAMBIOS////////////

    /////////INICIO FUNCION DE USUARIOS////////////

    public async getReportUsuarioPcrc(idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`
        SELECT usuario.documento,usuario.user_name as usuarios ,usuario.creation_date as fecha_creacion ,usuario.rol 
        FROM usuario
        JOIN usuario_base ON usuario_base.documento=usuario.documento
        JOIN dp_pcrc ON dp_pcrc.id_dp_pcrc=usuario_base.base_id
        WHERE dp_pcrc.id_dp_pcrc=? LIMIT ? OFFSET ?`,[idpcrc,limite,pag])

        return result;
    }

    public async getUsuarioTotal(idpcrc){

        const limite=5;
        const limite2=500;
        
        let result:any = await this.db.NIKSLAVE(`
        SELECT COUNT(*) total_usuario
        FROM usuario
        JOIN usuario_base ON usuario_base.documento=usuario.documento
        JOIN dp_pcrc ON dp_pcrc.id_dp_pcrc=usuario_base.base_id
        WHERE dp_pcrc.id_dp_pcrc=?`,[idpcrc])

        let data=await this.Paginatotal(result[0].total_usuario,limite)
        let data2=await this.Paginatotalexcel(result[0].total_usuario,limite2)
       
        return {"total_usuario":data,"total_exportar":data2}

    }

    /////////FIN FUNCION DE USUARIOS////////////
    
    public async Paginatotalexcel(total_exportar,limite){

        let numeroexportar=[]

        if(Number.isInteger(total_exportar/limite)){
      
            for (var i = 1; i <= total_exportar/limite; i++) {
              numeroexportar.push(i);
            }
    
            return numeroexportar
              
            }else{
      
              let num
              num = parseFloat(total_exportar)/limite + 0.5;
              num = Math.round(num);
              num = Number(num.toFixed(0));
              for (var i = 1; i <= num; i++) {
                numeroexportar.push(i);
              }
    
              return numeroexportar
      
            }

    }

    public async Paginatotal(total_lecturas,limite){

        if(Number.isInteger(total_lecturas/limite)){
      
            return total_lecturas/limite;
            
          }else{
    
            let num
            num = parseFloat(total_lecturas)/limite + 0.5;
            num = Math.round(num);
            num = Number(num.toFixed(0));
            return num;
    
          }

    }

    public async getReportComments(base_id, categoria_id,ini,fin){
        
        let result = await this.db.NIKSLAVE(`call get_report_comments(?,?,?,?)`,[base_id, categoria_id,ini,fin])
        return result;
    }

    public async getReportCambio(idarticulo,ini,fin){
        
        let result = await this.db.NIKSLAVE(`call get_report_cambios(?,?,?)`,[idarticulo,ini,fin])
        return result;
    }

    public async getReportCommentsLimit(base_id, categoria_id,ini,fin,limite,pag){
        
        let result = await this.db.NIKSLAVE(`call get_report_comments_limit(?,?,?,?,?,?)`,[base_id, categoria_id,ini,fin,limite,pag])
        return result;
    }

    public async getReportBases(idarticulo){
        
        let result = await this.db.NIKSLAVE(`call get_report_basedatos(?)`,[idarticulo])
        return result;
    }

    public async getReportBasesCategory(idcategoria){
        
        let result = await this.db.NIKSLAVE(`call get_report_basedatos_category(?)`,[idcategoria])
        return result;
    }

    public async getReportBasesPcrc(idpcrc){
        
        let result = await this.db.NIKSLAVE(`call get_report_basedatos_pcrc(?)`,[idpcrc])
        return result;
    }

    public async getReportBasesCategoryLimit(idcategoria,limite,pag){
        
        let result = await this.db.NIKSLAVE(`call get_report_basedatos_category_limit(?,?,?)`,[idcategoria,limite,pag])
        return result;
    }

    public async getReportBasesPcrcLimit(idpcrc,limite,pag){
        
        let result = await this.db.NIKSLAVE(`call get_report_basedatos_pcrc_limit(?,?,?)`,[idpcrc,limite,pag])
        return result;
    }

    public async getReportLectura(ini,fin,idarticulo){
        let result = await this.db.NIKSLAVE(`call get_report_lectura(?,?,?)`,[ini,fin,idarticulo])
        return result;
    }
    public async getReportLecturaData(ini,fin,idarticulo){
        console.log(idarticulo)
        let result = await this.db.NIKSLAVE(`call get_report_lectura(?,?,?)`,[ini,fin,idarticulo])
        return result;
    }


   

    public async getReportUsuario(idpcrc){
        let result = await this.db.NIKSLAVE(`call get_report_usuarios(?)`,[idpcrc])
        return result;
    }

    public async getReportLecturaCategory(ini,fin,idarticulo){
        let result = await this.db.NIKSLAVE(`call get_report_lectura_category(?,?,?)`,[idarticulo,ini,fin])
        return result;
    }

    

    async getCommnetByPcrc(id:any, dateIni, dateFin){
        return await this.db.NIKSLAVE(`call get_report_comentario(?,?,?)`,[id,dateIni,dateFin])
    }

    async getCommnetByPcrcLimit(id:any, dateIni, dateFin,limite,pag){
        return await this.db.NIKSLAVE(`call get_report_comentario_limit(?,?,?,?,?)`,[id,dateIni,dateFin,limite,pag])
    }


   async getCategoryById(id:any){
        return await this.db.NIKSLAVE(`call get_categoria_by_id(?)`,[id])
    }

    async getTotalArticulo(){
        return await this.db.NIKSLAVE(`call get_report_total_articulo()`)
    }

    async getTotalArticuloLimit(limite,pag){
        return await this.db.NIKSLAVE(`call get_report_total_articulo_limit(?,?)`,[limite,pag])
    }

    async getTotalFinanciera(fechaini,fechafin){
        
        return await this.db.NIKSLAVE(`call get_consolidado(?,?)`,[ fechaini,fechafin] )
    }

    async getTotalFinancieraLimit(fechainit, fechafin, limite, pag){
        return await this.db.NIKSLAVE('call get_consolidado_limit(?,?,?,?)',[fechainit, fechafin, limite, pag])
    } 

    async generaExcel(data:Array<any>, tipo:number, name:any){
        const res = name 
        const url = `./public/uploads/${res}.xlsx`

        const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(data)
        const wb:XLSX.WorkBook  =  XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb,ws,'sheet1')
        XLSX.writeFile(wb,resolve(url))

        return await this.uploadS3(url,name,tipo)
    } 

    async uploadS3(url, name, type){
      let parametro:any = {
            Bucket:process.env.BUCKET_NAME,
            Key: 'folder/'+name+'.xlsx',
            Body: fs.createReadStream('./public/uploads/'+name+'.xlsx'),
            ACL    : 'public-read'
        }
        let { Location } = await this.s3Client.upload(parametro).promise() 

      
        const { insertId }:any =  await this.db.NIKSLAVE(`insert into exportables (name, tipo_id, url) values (?,?,?)`,[name, type, process.env.BUCKET_URL+'/'+parametro.Key])
        const [resp]:any = await this.db.NIKSLAVE('select id, url from exportables where id=?',[insertId])
        await unlink(resolve('./public/uploads/'+name+'.xlsx'))
        return resp
        
    }

    async deleteReport(id){
       const { name }:any = await this.db.NIKSLAVE('select name from exportables where id=?',[id])
       const params:any = {
          Bucket:process.env.BUCKET_NAME,
          Key:'folder/'+name+'.xlsx',
       }
       await this.s3Client.deleteObject(params)
       await this.db.NIKSLAVE('delete from exportables where id=?',[id])
       return { message:'report was download' }
    }
 
    async  depurarReporte(){
       const exportables:any = await this.db.NIKSLAVE('select id, name from exportables limit 100')
       for (const data of exportables) {
            const params:any = {
            Bucket:process.env.BUCKET_NAME,
            Key:'folder/'+data.name+'.xlsx',
         }
          await this.s3Client.deleteObject(params).promise()
          await this.db.NIKSLAVE('delete from exportables where id=?',[data.id])
       }
       return true 
    }

    //////////INICIO FUNCION DE OBLIGATORIOS///////////

    async getReportObligatorioPcrc(idpcrc,fechaini,fechafinal,usuarios,limite,pag){

        let data:any=await this.db.NIKSLAVE(`SELECT a.user_name,a.documento,h.fecha_vista,f.titulo AS titulo_periodo,s.title AS titulo_articulo FROM articulos_obligatorio_usuario h
        JOIN articulos_obligatorios f ON f.id=h.id_periodo
        JOIN articulo s ON s.id=f.id_articulo
        JOIN usuario a ON a.id=h.id_usuario
        JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
        WHERE b.id_pcrc=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?
        LIMIT ? OFFSET ?`,[idpcrc,fechaini,fechafinal,limite,pag])

        if(usuarios==1){

            return data;

        }else{

            let usuariosexist=[]

            data.forEach(element => {
                usuariosexist.push(element.documento)
            });

            let result = usuariosexist.filter((item,index)=>{
                return usuariosexist.indexOf(item) === index;
              })

              let datos=await this.db.NIKSLAVE(`SELECT a.documento,a.user_name AS nombre_completo FROM usuario a
              JOIN usuario_base b ON b.documento=a.documento
              WHERE b.base_id=? AND a.documento NOT IN (?) LIMIT ? OFFSET ?`,[idpcrc,result.join(),limite,pag])

              return datos;

        }

        

}

async getObligatorioTotal(idpcrc,fechaini,fechafinal,usuarios){

    const limite=5;
    const limite2=500;

    let data:any=await this.db.NIKSLAVE(`SELECT COUNT(*) AS total_obligatorio FROM articulos_obligatorio_usuario h
    JOIN articulos_obligatorios f ON f.id=h.id_periodo
    JOIN articulo s ON s.id=f.id_articulo
    JOIN usuario a ON a.id=h.id_usuario
    JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
    WHERE b.id_pcrc=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?`,[idpcrc,fechaini,fechafinal])

    if(usuarios==1){

        let data3=await this.Paginatotal(data[0].total_obligatorio,limite)
        let data2=await this.Paginatotalexcel(data[0].total_obligatorio,limite2)
       
        return {"total_obligatorio":data3,"total_exportar":data2}

    }else{

        let usuariosexist=[]

        data.forEach(element => {
            usuariosexist.push(element.documento)
        });

        let result = usuariosexist.filter((item,index)=>{
            return usuariosexist.indexOf(item) === index;
          })

          let datos:any=await this.db.NIKSLAVE(`SELECT COUNT(*) AS total_obligatorio FROM usuario a
          JOIN usuario_base b ON b.documento=a.documento
          WHERE b.base_id=? AND a.documento NOT IN (?)`,[idpcrc,result.join()])

        let data3=await this.Paginatotal(datos[0].total_obligatorio,limite)
        let data2=await this.Paginatotalexcel(datos[0].total_obligatorio,limite2)
       
        return {"total_obligatorio":data3,"total_exportar":data2}

    }

    

}

async getObligatorioCategoria(idpcrc,fechaini,fechafinal,usuarios,limite,pag,idcategoria){

    let data:any=await this.db.NIKSLAVE(`SELECT a.user_name,a.documento,h.fecha_vista,f.titulo AS titulo_periodo,s.title AS titulo_articulo FROM articulos_obligatorio_usuario h
    JOIN articulos_obligatorios f ON f.id=h.id_periodo
    JOIN articulo s ON s.id=f.id_articulo
    JOIN usuario a ON a.id=h.id_usuario
    JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
    WHERE s.categoria_id=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?
    LIMIT ? OFFSET ?`,[idcategoria,fechaini,fechafinal,limite,pag])

    if(usuarios==1){

        return data;

    }else{

        let usuariosexist=[]

        data.forEach(element => {
            usuariosexist.push(element.documento)
        });

        let result = usuariosexist.filter((item,index)=>{
            return usuariosexist.indexOf(item) === index;
          })

          let datos=await this.db.NIKSLAVE(`SELECT a.documento,a.user_name AS nombre_completo FROM usuario a
          JOIN usuario_base b ON b.documento=a.documento
          WHERE b.base_id=? AND a.documento NOT IN (?) LIMIT ? OFFSET ?`,[idpcrc,result.join(),limite,pag])

          return datos;

    }

    

}

async getObligatorioCategoriaTotal(idpcrc,fechaini,fechafinal,usuarios,idcategoria){

const limite=5;
const limite2=500;

let data:any=await this.db.NIKSLAVE(`SELECT COUNT(*) AS total_obligatorio FROM articulos_obligatorio_usuario h
JOIN articulos_obligatorios f ON f.id=h.id_periodo
JOIN articulo s ON s.id=f.id_articulo
JOIN usuario a ON a.id=h.id_usuario
JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=f.id
WHERE s.categoria_id=? AND DATE_FORMAT(h.fecha_vista,'%Y/%m/%d') BETWEEN ? AND ?`,[idcategoria,fechaini,fechafinal])

if(usuarios==1){

    let data3=await this.Paginatotal(data[0].total_obligatorio,limite)
    let data2=await this.Paginatotalexcel(data[0].total_obligatorio,limite2)
   
    return {"total_obligatorio":data3,"total_exportar":data2}

}else{

    let usuariosexist=[]

    data.forEach(element => {
        usuariosexist.push(element.documento)
    });

    let result = usuariosexist.filter((item,index)=>{
        return usuariosexist.indexOf(item) === index;
      })

      let datos:any=await this.db.NIKSLAVE(`SELECT COUNT(*) AS total_obligatorio FROM usuario a
      JOIN usuario_base b ON b.documento=a.documento
      WHERE b.base_id=? AND a.documento NOT IN (?)`,[idpcrc,result.join()])

    let data3=await this.Paginatotal(datos[0].total_obligatorio,limite)
    let data2=await this.Paginatotalexcel(datos[0].total_obligatorio,limite2)
   
    return {"total_obligatorio":data3,"total_exportar":data2}

}



}

    //////////FIN FUNCION DE OBLIGATORIOS///////////
 
} 
