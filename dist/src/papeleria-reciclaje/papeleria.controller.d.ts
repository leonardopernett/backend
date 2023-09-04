import { PapeleriaService } from './papeleria.service';
import { Response } from 'express';
export declare class PapeleriaController {
    private readonly papeleriaService;
    constructor(papeleriaService: PapeleriaService);
    getAllArticleDelete(res: any): Promise<any>;
    deleteArticle(id: any, res: Response): Promise<Response<any>>;
}
