import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export interface likeUser {
    user: string,
    article: string,
    type: 'like'|'dislike'
}

@Injectable()
export class LikeUserIndex extends Esindex<likeUser> {
    constructor(){
        super('userlike', process.env.ES_PUNTO_ENLACE)
    }

}