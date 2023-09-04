import { CanActivate, ExecutionContext, Injectable, Inject, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserModelService } from "../usuarios/user-model.service";
import { DbService } from "../databases/db.service";
import { userRaw } from "../usuarios/entities";
import { BaseModelService } from '../bases/base-model.service'
import { asignaciones } from "./asignacionBases";
import { map } from 'async';
const bcrypt = require('bcrypt');

@Injectable() 
export class ActiveDirectoryGuard implements CanActivate {
 
  constructor( 
    
  /* @Inject('activeDirectory') private ad,
    @Inject('activeDirectory2') private ad2,
    @Inject('activeDirectory3') private ad3, */ 
    private userModel: UserModelService,
    private db: DbService,
    private baseModel:BaseModelService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    let validator = async () => {

      let persona
      let user
      let usernameF
      let ldap=false
      let ctx = context.switchToHttp()
      let req = ctx.getRequest()

        usernameF = `${req.body.username}*`;

        try{
            throw new Error("1");   
           /* await this.ad.authenticate(req.body.username+'@multienlace.com.co', req.body.password);
            */
        }catch(error){

          try{

                throw new Error("1");  
               /* await this.ad2.authenticate(req.body.username+'@co.grupodigitex.com', req.body.password); 
   */
          }catch(error){

            try{

                throw new Error("2");   
               /*  await this.ad3.authenticate(req.body.username+'@fscomdata.loc', req.body.password); 
   */
            }catch(error){

              let [bloqueo]=await this.db.nikcleanPoolConection.query("SELECT bloqueo FROM usuario_nik WHERE documento=?",[req.body.username])

              if (bloqueo[0].bloqueo==3) {

                throw new HttpException({
                  "message": "Usuario o Contraseña Incorrecta"
                }, 401)
                
              }else{

              [user]=await this.db.nikcleanPoolConection.query("SELECT password FROM usuario_nik WHERE documento=?",[req.body.username])

              const result = await bcrypt.compare(req.body.password, user[0].password);
              
              if (result==false) {

                this.db.nikcleanPoolConection.query(`UPDATE usuario_nik
                SET bloqueo = 1+bloqueo
                WHERE documento=?`,[req.body.username])

                throw new HttpException({
                  "message": "Usuario o Contraseña Incorrecta"
                }, 401)
                
                
              }else{
                ldap=true
              }

            }

            }

          }  

        }

        
  /* await new Promise((resolve, reject) => {

  this.ad.findUser(usernameF, (err, userData) => {
    if (err) {
      reject(err);
    } else {
      console.log(userData)
      resolve(userData);
    }
  });

})
  .then((userData:any) => {
    if (userData) {
      persona = {
        "user": userData.sAMAccountName + '@multienlace.com.co',
        "postOfficeBox": userData.postOfficeBox,
        "cn": userData.cn
      };
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


   await new Promise((resolve, reject) => {

    this.ad2.findUser(usernameF, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        console.log(userData)
        resolve(userData);
      }
    });
    
  })
    .then((userData:any) => {
      if (userData) {
        persona = {
          "user": userData.sAMAccountName + '@co.grupodigitex.com',
          "postOfficeBox": userData.postOfficeBox,
          "cn": userData.cn
        };
      }
    })
    .catch(error => {
      console.error('Error:', error);
    }); 

     await new Promise((resolve, reject) => {

      this.ad3.findUser(usernameF, (err, userData) => {
        if (err) {
          reject(err);
        } else {
          console.log(userData)
          resolve(userData);
        }
      });
      
    })
      .then((userData:any) => {
        if (userData) {
          persona = {
            "user": userData.sAMAccountName +'@fscomdata.loc',
            "postOfficeBox": userData.postOfficeBox,
            "cn": userData.cn
          };
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });   */

      if(ldap){

      if(user[0].length!=0){

        let usernik:any=await this.db.nikcleanPoolConection.query("SELECT documento,nombre FROM usuario_nik WHERE documento=?",[req.body.username])
        
        if(usernik[0][0]!=0){
         
          persona = {
            "postOfficeBox": usernik[0][0].documento,
            "cn": usernik[0][0].nombre
          };

        }

      }

    }

        let permisosA=[]
        let permisosD=[]

        var [userfind] = await this.db.NIK<userRaw>('call get_usuario_by_documento(?)',[persona.postOfficeBox])

        if(!userfind){

          var newuser = await this.userModel.createUser(persona.cn, persona.postOfficeBox)

          await this.db.nikcleanPoolConection.query(`REPLACE INTO usuarios_roles
        (
            id_usuario,
            id_rol
        )
        VALUES
        (?, ?)`,[newuser.id,3]);

          let userBases = await this.baseModel.getUserBases(newuser.documento)


          if(userBases.length){
            let ids_pcrc = userBases.map(cliente => {
              return cliente.pcrcs.map(pcrc => pcrc.id_dp_pcrc)
            }).reduce((acc, curr) =>{
              return [...acc,...curr]
            }, [])
            
            let asignacionesParaAgregar = asignaciones.filter(asignacion => ids_pcrc.includes(parseInt(asignacion.baseOrigen)))

            await map(asignacionesParaAgregar, async asignacion => { 
              try {
                return await this.baseModel.postUserBase(newuser.documento, asignacion.acceso, '')                
              } catch (error) { 
                
              }
            })
          }

          var [userfindDefault] = await this.db.NIK<userRaw>('call get_usuario_by_documento(?)',[newuser.documento])

          

          let permisosRolDefecto:any= await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_roles WHERE permisos_roles.id_rol=?',[userfindDefault.id_rol])

          let permisosDefecto:any = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_usuario WHERE permisos_usuario.id_usuario=?',userfindDefault.id)

          permisosDefecto[0].forEach(element => {
            permisosD.push(element.id_permiso)
         });

          permisosRolDefecto[0].forEach(element => {

            if(permisosD.indexOf(element.id_permiso)==-1){
              permisosD.push(element.id_permiso)
            }

          })

          req.user = {
            sub: newuser.documento,
            name: persona.cn,
            rol: userfindDefault.rol,
            permiso:permisosD
          }

          

        } else {

          let permisosRol:any= await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_roles WHERE permisos_roles.id_rol=?',[userfind.id_rol])

          let permisos:any = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_usuario WHERE permisos_usuario.id_usuario=?',userfind.id)

          permisos[0].forEach(element => {
            permisosA.push(element.id_permiso)
         });

          permisosRol[0].forEach(element => {

            if(permisosA.indexOf(element.id_permiso)==-1){
              permisosA.push(element.id_permiso)
            }
            
         });

          req.user = {
            sub: userfind.documento,
            name: persona.cn,
            rol: userfind.rol,
            permiso: permisosA
          }

        }
        
        return true 

    }

    return validator()
  }
}

