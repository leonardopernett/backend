import { Module} from '@nestjs/common';
import { NotificacionesController } from './notificaciones.controller';
import { NotificacionesServices } from './notificaciones.service';


@Module({
    controllers: [
        NotificacionesController
    ],
    providers: [ 
        NotificacionesServices
    ],
    exports: [
      NotificacionesServices
    ],
    imports: [
   
    ] 
})
export class NotificacionesModule {}
 