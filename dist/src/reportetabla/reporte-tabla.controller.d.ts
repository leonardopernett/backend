import { ReportsTableModelService } from './reporte-tabla-model.service';
import S3 = require('aws-sdk/clients/s3');
export declare class ReportsTableController {
    private Reporte;
    s3Client: S3;
    constructor(Reporte: ReportsTableModelService);
    uploadFile(image: any, body: any, req: any, res: any): Promise<any>;
    downloadFile(): Promise<unknown[]>;
}
