import { Module } from '@nestjs/common';
import { AutomatizacionController } from './automatizacion.controller';
import { AutomatizacionModelService } from './automatizacion-model.service';

@Module({
    controllers: [
        AutomatizacionController
    ],
    providers: [
        AutomatizacionModelService,
    ],
    exports: [
        AutomatizacionModelService
    ],
    imports: [
   
    ]
})
export class AutomatizacionModule {}