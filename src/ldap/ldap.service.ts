import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";
const bcrypt = require('bcrypt');

@Injectable()
export class LdapModelService {

    constructor(
        private db:DbService
        ) { }

 
        async  insertarLdap(documento,password,nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo) {

          const hash = await bcrypt.hash(password, 10);

          let [data]=await this.db.nikcleanPoolConection.query(`
          INSERT INTO usuario_nik (documento,password,nombre,correo_personal,id_genero,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo_usuario) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[documento,hash,nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo])
        
        return data;
         
        }

        async  editarLdap(nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,id,tipo,actividad) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET nombre = ?,correo_personal = ?,id_genero = ?,fecha_nacimiento = ?, direccion = ?, correo_corporativo = ?,celular = ?,telefono = ?,tipo_usuario = ?, fecha_actividad = ?
          WHERE id=?
          `,[nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo,actividad,id])
          
        return data;
         
        }

        async  buscarLdap(usuario) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT a.id, a.documento , a.nombre, a.correo_personal, b.genero, b.id_genero , a.fecha_nacimiento , a.direccion , a.correo_corporativo , a.bloqueo , a.celular , a.telefono
          FROM usuario_nik a
          JOIN genero b  ON a.id_genero=b.id_genero 
          WHERE documento=?`,[usuario])
        
        return data;
         
        }

        async  validarusuario(usuario) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT a.id FROM usuario a 
          WHERE a.documento=?
          UNION 
          SELECT b.id FROM usuario_nik b
          WHERE b.documento=?`,[usuario,usuario])
        
        return data;
         
        }

        async  generoLdap() {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT * FROM genero`)
        
        return data;
         
        }

        async  tipoLdap() {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT * FROM tipo_usuario`)
        
        return data;
         
        }
   
        async  mostrarLdap() {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT a.id, a.documento , a.nombre, a.correo_personal, b.genero , b.id_genero, a.fecha_nacimiento , a.direccion , a.correo_corporativo , a.bloqueo  , a.celular , a.telefono , a.tipo_usuario, DATE_ADD(a.fecha_actividad, INTERVAL c.fecha_bloqueo DAY) AS fecha_expiracion, a.fecha_actividad
          FROM usuario_nik a
          JOIN genero b  ON a.id_genero=b.id_genero
          JOIN tipo_usuario c ON c.id=a.tipo_usuario 
          ORDER BY id DESC 
          LIMIT 10`)
        
        return data;
         
        }

        async  eliminarLdap(usuario,documento) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          DELETE FROM usuario_nik WHERE id=?`,[usuario])

          await this.db.nikcleanPoolConection.query(`
          DELETE FROM usuario WHERE documento=?`,[documento])
        
        return data;
         
        }
        
        async  desbloquearusuario(id,desbloquearnew) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET bloqueo = ?
          WHERE id=?
          `,[desbloquearnew,id])
          
        
        return data;
         
        }

        async  ingreso(id) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT a.id FROM usuario_nik a 
          WHERE a.documento=?
          `,[id])
          
        
        return data;
         
        }

        async  primeringreso(id) {

          let [data]=await this.db.nikcleanPoolConection.query(`
          SELECT a.primer_ingreso FROM usuario_nik a 
          WHERE a.documento=?
          `,[id])
          
        
        return data;
         
        }

        async cambiarpassword(id,nuevopassword){

          const hash = await bcrypt.hash(nuevopassword, 10);

          let [data]=await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET password = ?,
          primer_ingreso=0
          WHERE documento=?
          `,[hash,id])
          
        
        return data;
         
        }

} 