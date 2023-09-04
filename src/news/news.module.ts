import { Module } from '@nestjs/common';
import { NewsController } from "./news.controller";
import { NewsModelService } from "./news-model.service";
import { ArticulosModule } from "../articulos/articulos.module";
@Module({
    controllers: [
        NewsController        
    ],
    providers: [
        NewsModelService
    ],
    exports: [
        NewsModelService
    ],
    imports: [
        ArticulosModule
    ]

})
export class NewsModule {}
