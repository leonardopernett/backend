import { Module, forwardRef } from '@nestjs/common';
import { BaseModelService } from "./base-model.service";
import { BaseController } from "./base.controller";
import { CategoriasModule } from "../categorias/categorias.module";
import { ElasticSearchModule } from "../elastic-search/elastic-search.module";
import { ArticulosModule } from "../articulos/articulos.module";
import { NewsModule } from "../news/news.module";
import { UsuariosModule } from "../usuarios/usuarios.module";
@Module({
    controllers: [
        BaseController
    ],
    providers: [
        BaseModelService
    ],
    exports: [
        BaseModelService
    ],
    imports: [
        CategoriasModule,
        ElasticSearchModule,
        ArticulosModule,
        NewsModule
    ]
})
export class BasesModule {}
