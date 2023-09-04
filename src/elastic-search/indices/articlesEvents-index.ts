import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export type posibleEvents = 'view'|'fav'|'like'|'dislike'|'lecture'|'comment';

export function isEvent(arg: any): arg is posibleEvents {
    return ['view','fav','like','dislike','lecture','comment'].includes(arg);
}

export class articleEvent {
    articulo:string;
    userId:string;
    publicationDate:number;
    modificationDate:number;
    modificationUser:string;
    creator:string;
    cliente:string;
    pcrc:string;
    categoria:string;
    eventDate:number;
    director:string;
    gerente:string;
    coordinador:string;
    lider:string;
    event:posibleEvents;
}

@Injectable()
export class ArticlesEventsIndex extends Esindex<articleEvent> {

    constructor(){
        super('articlesevents', process.env.ES_PUNTO_ENLACE)
    }

}