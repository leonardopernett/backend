import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UserjwtModelService } from "./userjwt-model.service";

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private userjwtModel:UserjwtModelService,

  ){   }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    let validator = async () => {

      let ctx = context.switchToHttp()
      let req = ctx.getRequest<Request>()
  
      if(!!!req.headers.authorization){
        return false
      }
      
      if(!req.headers.authorization.startsWith('Bearer ')){
        return false
      }
      
      if(req.headers.authorization.split('Bearer ').length < 2){
        return false
      }

      let token = req.headers.authorization.split('Bearer ')[1]

      try {
        var tokenPayLoad = this.userjwtModel.validateJwt(token)
      } catch(error) {
        return false
      }
  
      req.user = {
        "sub":tokenPayLoad.sub,
        "name":tokenPayLoad.name,
        "rol":tokenPayLoad.rol
      }
  
      let tokens = await this.userjwtModel.getJWT( tokenPayLoad.sub )

      if(tokens==undefined){
        return false
      }

      if(tokens.length == 0){
        return false
      } else {
        return true        
      }
    }

    return validator()

  }
}
