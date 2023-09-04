import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfExportService } from './pdf-export.service';

@Controller('api/articles/pdf/')
export class PdfExportController {
  constructor(private readonly pdfService: PdfExportService) { }

  @Get(':id')
  async generatePdf(
    @Param('id') id: string,
    @Res() res: Response,
  ) {


    const pdfBytes = await this.pdfService.generatePdf(id);
    
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename=output.pdf`);
    res.send(pdfBytes);

  }

}
