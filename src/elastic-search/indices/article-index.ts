import { errors, RequestParams } from "@elastic/elasticsearch";
import { Injectable, HttpException } from "@nestjs/common";
import * as R from 'remeda';
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

@Injectable()
export class ArticleIndex extends Esindex<Article> {
    constructor() {
        super('articles', process.env.ES_PUNTO_ENLACE)
    }

}