import { Module } from '@nestjs/common';
import { ControlCambiosController } from './control-cambios.controller';
import { ControlCambiosModelService } from './control-cambios.service';

@Module({
    controllers: [
        ControlCambiosController
    ],
    providers: [
        ControlCambiosModelService,
    ],
    exports: [
        ControlCambiosModelService
    ],
    imports: [
   
    ]
})
export class ControlCambiosModule {}