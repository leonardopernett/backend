import { Module } from '@nestjs/common';
import { MigracionController } from './migracion.controller';
import { MigracionModelService } from './migracion-model.service';
import { ElasticSearchModule } from "../elastic-search/elastic-search.module";
import { ArticulosModule } from "../articulos/articulos.module";
@Module({
  controllers: [MigracionController],
  providers: [MigracionModelService],
  imports: [
    ElasticSearchModule,
    ArticulosModule
  ]
})
export class MigracionModule {}
