import { Injectable } from '@nestjs/common';
import {createTransport} from 'nodemailer'
import {sign,verify} from 'jsonwebtoken'
import { DbService } from '../databases/db.service';

@Injectable()
export class UsuarioExternoService {

    constructor(
        private db:DbService
    ) { }

     generateToke(email){
        return sign({email:email}, 'secretkey',{expiresIn:'1h'})
      }

     sendmail(data){
           
        const trasporte = createTransport({
            host: '172.102.100.31',
            port: 25,
            secure: false,
            auth:false,
            tls: {
                rejectUnauthorized: false
            }
          })
   
          try {
            data.forEach( async (item) => {
              let mailOptions = {
                from:'gestoresdelaprendizaje@grupokonecta.com',
                to:item.value,
                subject: 'Inscripcion',
                text: `http://localhost:4200/#/register/${this.generateToke(item.value)}`,
                html:`
                <h2>Acceder Url Para Registro</h2>
                <p>http://localhost:4200/#/register/${this.generateToke(item.value)}</p>
                
                 
                `
              }
        
              await trasporte.sendMail(mailOptions)
              return {mensaje:"Enviados"};
            })
          } catch (error) {
            console.log(error)
          }
         return ;

     }

     async getuser(){
        let result = await this.db.NIK(`CALL get_user_externos`);
        return result;
     }

     async createuser(data){

        let result = await this.db.NIK(`call crear_usuario_externo(?,?,?,?,?)`,[data.documento, data.nombres,data.apellidos,data.correo,data.password])
        return {mensaje:"Usuario Creado Exitosamente"};

     }

     async deleteuser(id){
        let result = await this.db.NIK(`call eliminar_usuario_externo(?)`,[id])
        return {mensaje:"Usuario Eliminado Exitosamente"};
     }

}