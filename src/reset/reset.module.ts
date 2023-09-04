import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetModelService } from './reset.service';

@Module({
    controllers: [
        ResetController
    ],
    providers: [
        ResetModelService,
    ],
    exports: [
        ResetModelService
    ],
    imports: [
   
    ]
})
export class ResetModule {}