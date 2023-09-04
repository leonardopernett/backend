import { DbService } from "../databases/db.service";
import { commentRaw } from "./entities";
export declare class commentDTO {
    replyTo: string;
    text: string;
}
export declare class CommentsModelService {
    private db;
    constructor(db: DbService);
    getComments: (articleId: string) => Promise<commentRaw[]>;
    postComment: (replyTo: string, text: string, articleId: string, userId: string) => Promise<{
        username: any;
        id: string;
        articulo_id: string;
        publication_date: string;
        user_id: string;
        reply_to: string;
        text: string;
    }>;
    getRepliesTo: (replyTo: string, from?: string, size?: string) => Promise<unknown[]>;
    deleteReplies(id: any): Promise<unknown[]>;
    deleteComment(id: any, cedula: any): Promise<unknown[]>;
    deleteComments(id: any): Promise<unknown[]>;
}
