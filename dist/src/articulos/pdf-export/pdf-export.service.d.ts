/// <reference types="node" />
import { ArticlesModelService } from '../articles-model.service';
export declare class PdfExportService {
    private readonly articlesService;
    constructor(articlesService: ArticlesModelService);
    generatePdf(articleId: string): Promise<Buffer>;
    getArticleById(articleId: string): Promise<{
        tags: string[];
        attached: string[];
        id: number;
        title: string;
        content: string;
        obj: string;
        state: string;
        categoria_id: number;
        type: string;
        likes: number;
        dislikes: number;
        favorites: number;
        vistas: number;
        es_id: string;
        base_id: string;
        cliente_id?: number;
    } | {
        id: number;
        title: string;
        content: string;
        obj: string;
        state: string;
        categoria_id: number;
        type: string;
        likes: number;
        dislikes: number;
        favorites: number;
        vistas: number;
        es_id: string;
        base_id: string;
        cliente_id?: number;
    }>;
    private convertQuillToHtml;
}
