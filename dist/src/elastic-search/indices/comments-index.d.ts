import { Esindex } from "../esindex";
export interface comment {
    articulo: string;
    publicationDate: number;
    user: string;
    username: string;
    replyTo: string;
    text: string;
    director: string;
    gerente: string;
    coordinador: string;
    lider: string;
    cliente: string;
    pcrc: string;
    categoria: string;
}
export declare class CommentsIndex extends Esindex<comment> {
    constructor();
}
