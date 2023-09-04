import { Response } from 'express';
import { PdfExportService } from './pdf-export.service';
export declare class PdfExportController {
    private readonly pdfService;
    constructor(pdfService: PdfExportService);
    generatePdf(id: string, res: Response): Promise<void>;
}
