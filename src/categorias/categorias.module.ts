import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from "./categories.controller";
import { CategoriesModelService } from "./categories-model.service";
import { ArticulosModule } from "../articulos/articulos.module";
@Module({
    controllers: [
        CategoriesController
    ],
    providers: [
        CategoriesModelService
    ],
    exports: [
        CategoriesModelService        
    ],
    imports: [
        forwardRef(() => ArticulosModule) 
    ]
})
export class CategoriasModule {}
