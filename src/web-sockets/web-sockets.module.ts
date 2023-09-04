import { Module, forwardRef } from '@nestjs/common';
import { NotificationsModelService } from "./notifications-model.service";
import { NotificationsGateway } from "./notifications.gateway";
import { UserNotificationsModelService } from "./userNotifications-model.service";
import { UsuariosModule } from "../usuarios/usuarios.module";
@Module({
    controllers: [],
    providers: [
        NotificationsModelService,
        NotificationsGateway,
        UserNotificationsModelService
    ],
    exports: [
        NotificationsModelService,
        NotificationsGateway,
        UserNotificationsModelService
    ],
    imports: [
        forwardRef(() => UsuariosModule)
    ]
})
export class WebSocketsModule {}
