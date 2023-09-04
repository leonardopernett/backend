import { Module } from '@nestjs/common';
import { ReportsTableController } from "../reportetabla/reporte-tabla.controller";
import { ReportsTableModelService } from '../reportetabla/reporte-tabla-model.service';

@Module({
    controllers: [
        ReportsTableController
    ],
    providers: [
        ReportsTableModelService
    ],
    imports: [
   
    ]
})
export class ReportesTableModule {}