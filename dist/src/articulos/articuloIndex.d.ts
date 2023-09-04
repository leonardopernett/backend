import { Esindex } from "../elastic-search/esindex";
export interface Articulo {
    title: string;
    content: string;
    tags: string[];
    likes: number;
    disLikes: number;
    favorites: number;
    publicationDate: number;
    state: string;
    category: string;
    base: string;
    views: number;
    type: string;
}
export declare class ArticuloIndex extends Esindex<Articulo> {
    constructor();
    query: (query: object) => Promise<(Articulo & {
        id: string;
        highlight: string;
    })[]>;
    didYouMean: (query: object) => Promise<any>;
}
