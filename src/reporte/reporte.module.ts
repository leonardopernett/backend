import { Module } from '@nestjs/common';
import { ReportsController } from "../reporte/reporte.controller";
import { ReportsModelService } from '../reporte/reporte-model.service';
const AD = require('activedirectory2').promiseWrapper;
@Module({
    controllers: [
        ReportsController
    ],
    providers: [
        ReportsModelService,
        {
            provide: 'activeDirectory',
            useFactory: () => {
      
              const config= {
                  url: 'ldap://172.20.1.220',
                  baseDN: 'dc=multienlace,dc=com,dc=co',
                  username: process.env.BIND_DN,
                  password: process.env.BIND_CREDENTIALS,
                 
              }
      
              return new AD(config);
            }
          }
    ],
    exports: [
        ReportsModelService
    ],
    imports: [
   
    ]
})
export class ReportesModule {}