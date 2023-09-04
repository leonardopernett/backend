import { Module} from '@nestjs/common';
import { UsuarioExternoService } from "./usuario-externo.service";
import { UsuarioExternoController } from "./usuario-externo.controller";

@Module({
    controllers: [
        UsuarioExternoController
    ],
    providers: [
        UsuarioExternoService
    ],
    exports: [
        UsuarioExternoService
    ],
    imports: [
   
    ]
})
export class UsuarioExternoModule {}
