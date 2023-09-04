import { Module } from '@nestjs/common';
import { ZendeskController } from './zendesk.controller';
import { ZendeskModelService } from './zendesk-model.service';


@Module({
    controllers: [
        ZendeskController
    ],
    providers: [
        ZendeskModelService,
    ],
    exports: [
        ZendeskModelService
    ],
    imports: [
    ]
})
export class ZendeskModule {}