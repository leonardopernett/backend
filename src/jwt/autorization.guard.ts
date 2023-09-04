import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DbService } from '../databases/db.service';
var token = require('basic-auth-token');
var atob = require('atob');
var CryptoJS = require("crypto-js");

@Injectable()
export class AutorizationGuard implements CanActivate {

  constructor(
    private db:DbService
  ){   }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    if(request.headers.authorization===undefined){
      return false;
    }
    
    let token=request.headers.authorization;
        let tokenS=token.split(" ",2)
        let tokendes=tokenS[1]
        let bin = atob(tokendes);
        let bindes=bin.split(":",2)
        let usuario=bindes[0];
        let password=bindes[1]; 

        let data= this.db.nikcleanPoolConection.query('SELECT * FROM api_users WHERE usuario=?',[usuario]);
         return data.then((data:any)=>{
            
            if(data[0].length){

                if(data[0][0].estado===1){

                    var bytes  = CryptoJS.AES.decrypt(data[0][0].password, 'abc');
                let passdec = bytes.toString(CryptoJS.enc.Utf8);
               
                if(passdec === password){
                    return true;
                }else{
                    return false;
                }

                }else{
                  return false;  
                }
            
                }else{
                return false;
               } 

        })

  }
}
