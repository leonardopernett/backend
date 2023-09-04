import { ArticuloIndex } from "../articulos/articuloIndex";
import { ArticlesModelService } from "../articulos/articles-model.service";
import { articuloRaw } from "../articulos/entities";
import { DbService } from "../databases/db.service";
export declare class postNewsDTO {
    title: string;
    content: string;
    obj: string;
    state: string;
    pcrc: string;
}
export declare class updateNewsDTO {
    title: string;
    content: string;
    obj: string;
    state: string;
}
export declare class NewsModelService {
    private db;
    private articlesModel;
    private articuloIndex;
    constructor(db: DbService, articlesModel: ArticlesModelService, articuloIndex: ArticuloIndex);
    getNewsByDate: (pcrcId: string, from: string, size: string, date: any) => Promise<(articuloRaw & {
        fecha_creacion: string;
    })[]>;
    getNewsBorradores: (pcrcId: string, from?: string, size?: string) => Promise<(articuloRaw & {
        fecha_creacion_borrador: string;
    })[]>;
    searchNews: (pcrcId: string, state: string, from: string, size: string, query: string) => Promise<(import("../articulos/articuloIndex").Articulo & {
        id: string;
        highlight: string;
    })[]>;
    getSingleNews: (newsId: string) => Promise<{
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
    postNews: (news: postNewsDTO, creator_id: string) => Promise<articuloRaw>;
    updateNews: (id: string, article: Partial<updateNewsDTO>, modificationUser_id: string) => Promise<any>;
    deleteNews: (idArticulo: string, iduser: any) => Promise<any>;
}
