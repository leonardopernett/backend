import { Injectable } from '@nestjs/common';
import { ArticlesModelService } from '../articles-model.service';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import * as pdf from 'html-pdf';

@Injectable()
export class PdfExportService {
  constructor(private readonly articlesService: ArticlesModelService) {}

  async generatePdf(articleId: string) {

    const article = await this.articlesService.getArticle(articleId);

    const htmlContent = this.convertQuillToHtml(article.obj);

  

    const htmlData = `
    <html>
      <head>
        <style>
            body{
            position: relative;
          }
          .content {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 50px 30px 30px 30px;
            line-height: 1;
          }
          h1 {
            font-size: 16px;
            text-align: center;
          }
          p {
            font-size: 12px;
            margin-top: 30px;
            text-align: justify;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .body-content{
            margin-bottom: 0;
          }
          .logo {
            position: fixed;
            top: 30px;
            left: 30px;
            width: 50px;
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div class="content">
            <h1>${article.title}</h1>
            <div class="body-content">${htmlContent}</div>
          </div>
        </div>
      </body>
    </html>
  `;

    const pdfOptions: pdf.CreateOptions = {
      format: 'Letter',
      border: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
        "header": {
          "height": "35mm",
          "contents": '<p style="color: #152c48; font-size: 40px; font-weight: bold; font-family: Arial, sans-serif; padding-left: 20px">Konecta</p>',

        },
      footer: {
        height: "28mm",
        contents: {
          default: '<p style="font-size: 8px; margin: 0px 40px">“Este documento es propiedad de Konecta Colombia (Multienlace S.A.S) y de uso confidencial e interno. En caso de ser compartido a un tercero o en el evento de procesos de contratación o cualquier otro proceso comercial, será para análisis interno del destinatario y éste se compromete, bajo la confidencialidad de la relación, a mantener el uso interno y no compartirlo bajo ninguna circunstancia a ningún competidor de Konecta o cualquier otro ente externo sin autorización expresa y escrita de Konecta, para ningún propósito, toda vez que puede reflejar parte del know-how de la compañía o contener información sensible”. </p>'
        }
      },
    };

    return new Promise<Buffer>((resolve, reject) => {
      pdf.create(htmlData, pdfOptions).toBuffer((error, buffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(buffer);
        }
      });
    });
  }

  async getArticleById(articleId: string) {
    return await this.articlesService.getArticle(articleId);
  }
  private convertQuillToHtml(quillDelta: any): string {
    const delta = JSON.parse(quillDelta);
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    return converter.convert();
  }
}
