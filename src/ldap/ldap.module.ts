import { Module } from '@nestjs/common';
import { LdapController } from './ldap.controller';
import { LdapModelService } from './ldap.service';

@Module({
    controllers: [
        LdapController
    ],
    providers: [
        LdapModelService,
    ],
    exports: [
        LdapModelService
    ],
    imports: [
   
    ]
})
export class LdapModule {}