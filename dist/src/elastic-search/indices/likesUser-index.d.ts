import { Esindex } from "../esindex";
export interface likeUser {
    user: string;
    article: string;
    type: 'like' | 'dislike';
}
export declare class LikeUserIndex extends Esindex<likeUser> {
    constructor();
}
