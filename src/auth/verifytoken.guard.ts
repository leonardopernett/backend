import { CanActivate, ExecutionContext, Injectable, Inject, HttpException,Headers } from '@nestjs/common';
import { Observable } from 'rxjs';
import {verify} from 'jsonwebtoken';
import { any } from 'async';

@Injectable()
export class VerifyGuard implements CanActivate {

  constructor(
  ) { }

  generarcabacera(payload){
   
    return verify(payload,"AXJDKRIOTP.,SJ,.@AS.,dmf@cf1283874",function(error,respuesta){
        if(error){
            return false;
        }else{
            return true;
        }
    })

}

  canActivate(
    context: ExecutionContext,
  ): boolean  {

    let ctx = context.switchToHttp()
    let req = ctx.getRequest()

    let data:any=this.generarcabacera(req.headers.authorization);
  
    if(data){
      return true;
    }else{
      return false;
    }

}

}
