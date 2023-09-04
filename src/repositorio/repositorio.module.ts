import { Module} from '@nestjs/common';
import { RepositorioServices } from "./repositorio.services";
import { RepositorioController } from "./respoitorio.controller";

@Module({
    controllers: [
        RepositorioController
    ],
    providers: [ 
        RepositorioServices
    ],
    exports: [
        RepositorioServices
    ],
    imports: [
   
    ]  
})
export class RepositorioModule {}
