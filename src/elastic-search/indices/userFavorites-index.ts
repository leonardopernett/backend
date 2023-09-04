import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export interface favoriteUser {
    user: string,
    article: string
}

@Injectable()
export class FavoriteUserIndex extends Esindex<favoriteUser> {
    constructor(){
        super('userfavorites', process.env.ES_PUNTO_ENLACE)
    }

}