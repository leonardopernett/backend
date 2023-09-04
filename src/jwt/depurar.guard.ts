import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class DepurarGuard implements CanActivate {
   
    canActivate(context:ExecutionContext){
        const req = context.switchToHttp().getRequest()
        if(!req.headers['authorization']) return false
        const token =  req.headers['authorization'].split(" ")[ 1 ]
        if(token != "amVua2lzOkNvbG9tYmlhMzIq") return false
        return true 
    }
} 