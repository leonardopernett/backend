import { User as U } from '../usuarios/entities';
import { NewsModelService, postNewsDTO, updateNewsDTO } from "./news-model.service";
export declare class NewsController {
    private newsModel;
    constructor(newsModel: NewsModelService);
    getSingleNews(idNews: string): Promise<any>;
    postNews(news: postNewsDTO, user: U): Promise<any>;
    updateNews(news: updateNewsDTO, user: U, idArticulo: string): Promise<any>;
    deleteNews(idArticulo: string, user: U): Promise<any>;
}
