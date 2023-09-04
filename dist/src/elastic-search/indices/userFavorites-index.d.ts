import { Esindex } from "../esindex";
export interface favoriteUser {
    user: string;
    article: string;
}
export declare class FavoriteUserIndex extends Esindex<favoriteUser> {
    constructor();
}
