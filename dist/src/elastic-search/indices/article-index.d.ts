import { Esindex } from "../esindex";
export interface Article {
    title: string;
    content: string;
    obj: string;
    tags?: string[];
    resume?: string;
    attached?: string[];
    likes?: string[];
    disLikes?: string[];
    favorites?: string[];
    state: string;
    publicationDate?: number;
    modificationDate?: number;
    modificationUser?: string;
    creator?: string;
    category: string;
    pcrc: string;
    cliente: string;
    views: number;
    type: string;
    role?: string;
}
export declare class ArticleIndex extends Esindex<Article> {
    constructor();
}
