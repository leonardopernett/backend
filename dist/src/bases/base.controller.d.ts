import { User as U } from '../usuarios/entities';
import { CategoriesModelService } from "../categorias/categories-model.service";
import { BaseModelService } from './base-model.service';
import { ArticlesModelService } from "../articulos/articles-model.service";
import { NewsModelService } from "../news/news-model.service";
import { SearchModelService } from "../elastic-search/search-model.service";
export declare class BaseController {
    private baseModel;
    private categoriesModel;
    private searchModel;
    private articlesModel;
    private newsModel;
    constructor(baseModel: BaseModelService, categoriesModel: CategoriesModelService, searchModel: SearchModelService, articlesModel: ArticlesModelService, newsModel: NewsModelService);
    getPcrcCategorie(idPcrc: string): Promise<any>;
    getPcrcCategorie2(idPcrc: string): Promise<any>;
    getArticles(idPcrc: string, query: string, orderby: string, tag: string, from: string, size: string, state: string, user: U): Promise<any>;
    getAllBases(user: U): Promise<any>;
    getUsuarios(idBase: string): Promise<any>;
    getPcrcCategories(idPcrc: string): Promise<any>;
    getArticlesByQuery(idPcrc: string, documento: string, query: string, orderby: string, tag: string, from: string, size: string, state: string, user: U): Promise<any>;
    getArticlesByRequired(idPcrc: any, documento: any, from: any, size: any): Promise<any>;
    getArticlesByQuery2(idPcrc: string, query: string, orderby: string, tag: string, from: string, size: string, state: string, user: U): Promise<any>;
    getNews(idPcrc: string, query: string, state: string, from: string, size: string, date: string): Promise<any>;
    getNews2(idPcrc: string, query: string, state: string, from: string, size: string, date: string): Promise<any>;
    getSuggestions(input: string, idPcrc: string): Promise<void | string[] | (import("../elastic-search/searchIndex").search & {
        id: string;
    })[]>;
    getDidYouMean(input: string, idPcrc: string): Promise<string>;
    puedeCopiar(idBase: string): Promise<any>;
    cambiarPermisoCopiar(idBase: string): Promise<any>;
    saveBase(body: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    savePcrc(body: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    viewBase(): Promise<unknown[]>;
    updateBase(body: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    updatePcrc(body: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    deleteBase(idbase: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    deletePcrc(idpcrc: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    viewpcrc(idbase: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
}
