

import { Module } from '@nestjs/common';
import { DatabasesModule } from '../../databases/databases.module';
import { ArticulosModule } from '../articulos.module';
import { PdfExportController } from './pdf-export.controller';
import { PdfExportService } from './pdf-export.service';

@Module({
    imports: [DatabasesModule, ArticulosModule],
    controllers: [PdfExportController],
    providers: [PdfExportService],
  })
export class PdfEportModule {}
