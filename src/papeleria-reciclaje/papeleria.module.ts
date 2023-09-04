import { Module} from '@nestjs/common';
import { PapeleriaController } from './papeleria.controller';
import { PapeleriaService } from './papeleria.service';


@Module({
    controllers: [
        PapeleriaController
    ],
    providers: [ 
        PapeleriaService
    ],
    exports: [
        PapeleriaService
    ],
    imports: [
   
    ] 
})
export class PapeleriaModule {}
 