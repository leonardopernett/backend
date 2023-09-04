import { Module } from '@nestjs/common';
import { CoordinadoresController } from "./coordinadores.controller";
import { CargosModelService } from './cargos-model.service'
import { ClientesController } from "./clientes.controller";
import { DirectoresController } from "./directores.controller";
import { GerentesController } from "./gerentes.controller";

@Module({
    controllers: [
        CoordinadoresController,
        ClientesController,
        DirectoresController,
        GerentesController
    ],
    providers: [
        CargosModelService
    ],
    exports: [
        CargosModelService
    ]
})
export class cargosModule {}
