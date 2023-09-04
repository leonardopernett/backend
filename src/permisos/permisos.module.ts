import { Module } from '@nestjs/common';
import { PerfilesController } from "./perfiles.controller";
import { PermisosController } from "./permisos.controller";
import { PermisionsModelService } from "./permisions-model.service";

@Module({
    controllers: [
        PerfilesController,
        PermisosController
    ],
    providers: [
        PermisionsModelService
    ],
    exports: [
        PermisionsModelService
    ]
})
export class PermisosModule {}
