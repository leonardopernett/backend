import { Esindex } from "../esindex";
export declare type posibleEvents = 'view' | 'fav' | 'like' | 'dislike' | 'lecture' | 'comment';
export declare function isEvent(arg: any): arg is posibleEvents;
export declare class articleEvent {
    articulo: string;
    userId: string;
    publicationDate: number;
    modificationDate: number;
    modificationUser: string;
    creator: string;
    cliente: string;
    pcrc: string;
    categoria: string;
    eventDate: number;
    director: string;
    gerente: string;
    coordinador: string;
    lider: string;
    event: posibleEvents;
}
export declare class ArticlesEventsIndex extends Esindex<articleEvent> {
    constructor();
}
