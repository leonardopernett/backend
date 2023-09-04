import { createParamDecorator } from '@nestjs/common';
import { User as U } from "./usuarios/entities";

export const User = createParamDecorator((data, req):U => {
  if(req.args){
    if(req.args[0]?.user){
      return req.args[0].user;
    }
  }
  
  if(req.user){
    return req.user
  }
});