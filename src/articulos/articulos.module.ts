import { Module, forwardRef } from '@nestjs/common';
import { ArticlesController } from "./articles.controller";
import { ArticlesModelService } from "./articles-model.service";
import { ArticuloIndex } from "./articuloIndex";
import { CategoriasModule } from "../categorias/categorias.module";
import { S3Module } from "../s3/s3.module";

@Module({
    controllers: [
        ArticlesController
    ],
    providers: [
        ArticlesModelService,
        ArticuloIndex,
    ],
    exports: [
        ArticlesModelService,
        ArticuloIndex,
    ],
    imports: [
        forwardRef(() => CategoriasModule),
        S3Module
    ]
})
export class ArticulosModule {
    
}