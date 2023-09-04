import { Module } from '@nestjs/common';
import { PreturnoController } from './preturno.controller';
import { PreturnoModelService } from './preturno-model.service';

@Module({
    controllers: [
        PreturnoController
    ],
    providers: [
        PreturnoModelService,
    ],
    exports: [
        PreturnoModelService
    ],
    imports: [
   
    ]
})
export class PreturnoModule {}