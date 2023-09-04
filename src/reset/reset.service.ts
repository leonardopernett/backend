import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

@Injectable()
export class ResetModelService {

    constructor(
        private db:DbService
        ) { }

 
      async generarToken(email){

        const payload = {
          email: email
        };

        const secretKey = 'AK$IA$VQG45YG2R.X45.A24T$FRK4BG5B';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        const transporte = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port: 465,
          secure: true,
          auth:{
           user:'leonardo.pernett@konecta-group.com',
           pass: 'goksgqyjtdcsrcik'
          },
          tls:{
           rejectUnauthorized:false
          }
        })
        
     await transporte.sendMail({
       from: '"Fred Foo 👻" <support_nik@grupokonecta.com>', // sender address
       to: email, // list of receivers
       subject: "Restablecimiento de contraseña", // Subject line
       text: "Hello world?", // plain text body
       html: `
           <!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Document</title>
           </head>
           <body>
             
             <h4>restablecer password</h4>
             <p>  </p>
             <a href="https://localhost:4200/#/reset?token=${token}">restablecer</a>
           </body>
           </html>
           
           `, 
       
     })

       }

       validartoken(token){

        const secretKey = 'AK$IA$VQG45YG2R.X45.A24T$FRK4BG5B';

        try{

        const decoded = jwt.verify(token, secretKey);
        return decoded

        }catch(error){

           return 0

        }

        

       }

       async resetPassword(email,nuevopassword){

        const hash = await bcrypt.hash(nuevopassword, 10);

        let [data]=await this.db.nikcleanPoolConection.query(`
        UPDATE usuario_nik
        SET password = ?
        WHERE correo_personal=? OR correo_corporativo=?
        `,[hash,email,email])
        
      
      return data;

       }


} 