import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtGuard } from "../jwt/jwt.guard";
import { RefreshJwtGuard } from "../jwt/refreshjwt.guard";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { UserjwtModelService } from "../jwt/userjwt-model.service";
import { BasesModule } from '../bases/bases.module'
const AD = require('activedirectory2').promiseWrapper;
const AD2 = require('activedirectory2').promiseWrapper;
const AD3 = require('activedirectory2').promiseWrapper;
const AD4 = require('activedirectory2').promiseWrapper;
import {newAsignacionBases} from './newAsignacionBases';
import { from } from 'rxjs';
@Module({
    controllers: [
        AuthController
    ], 
    providers: [
        JwtGuard,
        newAsignacionBases,
        RefreshJwtGuard, 
        UserjwtModelService,
        {
            provide: 'activeDirectory',
            useFactory: () => {
             /*  ldap://172.20.1.220 viejo
                 ldap://172.102.100.220 nuevo
             */
              const config= {
                  url: 'ldap://172.20.1.220',
                  baseDN: 'dc=multienlace,dc=com,dc=co',
                  username: process.env.BIND_DN,
                  password: process.env.BIND_CREDENTIALS,
                  attributes: {
                      "user": [
                          'postOfficeBox', 'cn','sAMAccountName' 
                      ]
                    }
              }
      
              return new AD(config);
            }
          } ,
          {
            provide: 'activeDirectory4',
            useFactory: () => {
              const config= {
                url: 'ldap://172.20.1.220',
                baseDN: 'dc=multienlace,dc=com,dc=co',
                username: process.env.BIND_DN,
                password: process.env.BIND_CREDENTIALS,
                attributes: {
                    "user": [
                        'postOfficeBox', 'cn','sAMAccountName' 
                    ]
                  }
              }
      
              return new AD4(config);
            }
          },
          {
            provide: 'activeDirectory2',
            useFactory: () => {
      
              const config= {
                url: 'ldap://10.164.62.100',
                  baseDN: 'dc=co,dc=grupodigitex,dc=com ', 
                  username: 'nikappco@co.grupodigitex.com',
                  password: 'Colombia123456',
                  attributes: {
                    "user": [
                        'postOfficeBox', 'cn','sAMAccountName' 
                    ]
                  }
              }
      
              return new AD2(config);
            }
          },
          {
            provide: 'activeDirectory3',
            useFactory: () => {
      
              const config= {
                url: 'ldap://10.162.250.80',
                  baseDN: 'dc=fscomdata,dc=loc', 
                  username: 'nikappfs@fscomdata.loc',
                  password: 'Colombia123456',
                  attributes: {
                    "user": [
                        'postOfficeBox', 'cn','sAMAccountName' 
                    ]
                  }
              }
      
              return new AD3(config);
            }
          } 
    ],
    exports: [
        JwtGuard,
        newAsignacionBases,
        RefreshJwtGuard,
        UserjwtModelService,
        
    ],
    imports: [
        UsuariosModule,
        BasesModule
    ]
})
export class AuthModule {}
