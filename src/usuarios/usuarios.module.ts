import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { UserModelService } from "./user-model.service";
import { UsersesionsModelService } from "./usersesions-model.service";
import { PermisosModule } from "../permisos/permisos.module";
import { BasesModule } from "../bases/bases.module";
import { WebSocketsModule } from "../web-sockets/web-sockets.module";
@Module({
    controllers: [
        UsersController
    ],
    providers: [
        UserModelService,
        UsersesionsModelService
    ],
    exports: [
        UserModelService,
        UsersesionsModelService
    ],
    imports: [
        PermisosModule,
        BasesModule,
        forwardRef(() => WebSocketsModule)
    ]
})
export class UsuariosModule {}
