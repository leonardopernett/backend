import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";

@Injectable()
export class AutomatizacionModelService {

    constructor(
        private db:DbService
        ) { }

    
   

  public async pcrc(){

    console.log('Actualizando Tabla de Pcrc...');

    this.db.NIK('truncate table dp_pcrc').then(async ()=>
      {

        let datos:any=await this.db.JARVIS('select * from dp_pcrc');

        let data=datos.map(item => [item.id_dp_pcrc, item.pcrc, item.id_dp_clientes,item.estado,item.cod_pcrc])
    
       this.db.nikcleanPoolConection.query('INSERT INTO dp_pcrc (id_dp_pcrc,pcrc,id_dp_clientes,estado,cod_pcrc) VALUES ?',
      [data]) 

      })

    console.log('Finalizado...');

  }

  public async cliente(){

    console.log('Actualizando Tabla de Cliente...');

    this.db.NIK('truncate table dp_clientes').then(async ()=>
      {
        let datos:any=await this.db.JARVIS('select id_dp_clientes,cliente,estado from dp_clientes');

       let data=datos.map(item => [item.id_dp_clientes, item.cliente, item.estado])

         this.db.nikcleanPoolConection.query('INSERT INTO dp_clientes (id_dp_clientes,cliente,estado) VALUES ?',
          [data]) 

      }
    );

    

    console.log('Finalizado...');

  }


  public async consolidar(){

    let data:any=await this.db.NIK('call get_consolidado_vista()')
    
    data.forEach(element => {

      this.db.NIK('call crear_consolidado_vista(?,?,?)',[element.articulo_id,element.initial_date,element.total])
      
    });

    console.log('Finalizado...');

  }

  public async depurarVista(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM vista WHERE vista.initial_date < DATE_SUB(NOW(), INTERVAL ? DAY)',[dias])
      return "Depuracion de vista exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar vista por: "+error);
    }

    
  }

  public async depurarBusqueda(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM busqueda WHERE search_date < DATE_SUB(NOW(), INTERVAL ? DAY)',[dias])
      return "Depuracion de busqueda exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar busqueda por: "+error);
    }

   
  }

  public async depurarCambioArticulo(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM cambio_articulo WHERE date < DATE_SUB(NOW(), INTERVAL ? DAY)',[dias])
      return "Depuracion de cambio articulo exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar cambio articulo por: "+error);
    }
    
  }

  public async depurarComentario(dias){

    
    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM comentario WHERE publication_date < DATE_SUB(NOW(), INTERVAL ? DAY)',[dias])
      return "Depuracion de comentario exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar comentario por: "+error);
    }

  }

  public async depurarSesion(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM sesion WHERE login < DATE_SUB(NOW(), INTERVAL ? DAY)',dias)
      return "Depuracion de sesion exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar sesion por: "+error);
    }
    
  }


  public async depurarTipoEvento(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM tipoevento WHERE fecha_evento < DATE_SUB(NOW(), INTERVAL ? DAY) OR id_user IS NULL',dias)
      return "Depuracion de tipo evento exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar tipo evento por: "+error);
    }
    
  }


  public async depurarJwt(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM jwt WHERE fecha_acceso < DATE_SUB(NOW(), INTERVAL ? DAY)',dias)
      return "Depuracion de jwt exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar jwt por: "+error);
    }
    
  }

  public async depurarUsuario(dias){

    let [data]:any=await this.db.nikcleanPoolConection.query(`SELECT id
    FROM usuario
    WHERE (
   SELECT MAX(login) FROM sesion 
   WHERE sesion.documento=usuario.documento
   )  < DATE_SUB(NOW(), INTERVAL ? DAY)`,[dias])

   data.forEach(async element => {
     await this.db.nikcleanPoolConection.query('DELETE FROM usuario WHERE id = ?',[element.id]) 
   });

   let [data2]:any=await this.db.nikcleanPoolConection.query(`SELECT user_name,
   creation_date,
   (
   SELECT MAX(login) FROM sesion 
   WHERE sesion.documento=usuario.documento
   ) AS ultima_conexion
    FROM usuario
    HAVING ultima_conexion IS NULL 
    AND creation_date < DATE_SUB(NOW(), INTERVAL ? DAY)`,[dias])

   data2.forEach(async element => {
     await this.db.nikcleanPoolConection.query('DELETE FROM usuario WHERE id = ?',[element.id]) 
   });

  }

  public async depurarBackupBusqueda(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM backup_busqueda WHERE search_date < DATE_SUB(NOW(), INTERVAL ? DAY)',dias)
      return "Depuracion de Backup Busqueda exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar Backup Busqueda por: "+error);
    }
    
  }

  public async depurarBackupCambioArticulo(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM backup_cambio_articulo WHERE date < DATE_SUB(NOW(), INTERVAL ? DAY)',dias)
      return "Depuracion de Backup Cambio Articulo exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar Backup Cambio Articulo por: "+error);
    }
    
  }


  public async depurarBackupSesion(dias){

    try {
      await this.db.nikcleanPoolConection.query('DELETE FROM backup_sesion WHERE login < DATE_SUB(NOW(), INTERVAL ? DAY)',dias)
      return "Depuracion de Backup Sesion exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar Backup Sesion por: "+error);
    }
    
  }

  public async depurarVistaMes(inicial,final){

    try {
      let [data]:any=await this.db.nikcleanPoolConection.query('SELECT * FROM vista a WHERE DATE_FORMAT(a.initial_date,"%Y-%m-%d") BETWEEN ? AND ?',[inicial,final])
      let datos=data.map(item => [item.id, item.articulo_id, item.usuario_id,item.initial_date,item.final_date])
      let datosDelete=data.map(item => [item.id])
      await this.db.nikcleanPoolConection.query('INSERT INTO vista_backup (id,articulo_id,usuario_id,initial_date,final_date) VALUES ?',
      [datos])
      await this.db.nikcleanPoolConection.query('DELETE FROM vista a WHERE DATE_FORMAT(a.initial_date,"%Y-%m-%d") BETWEEN ? AND ?',[inicial,final])
      return "Depuracion de Backup Sesion exitosa"
    } catch (error) {
      throw new Error("No se pudo depurar Backup Sesion por: "+error);
    }

  }
   
} 