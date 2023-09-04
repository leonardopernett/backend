import { CommentsModelService, commentDTO } from "./comments-model.service";
import { User as U } from '../usuarios/entities';
export declare class CommentsController {
    private commentsModel;
    constructor(commentsModel: CommentsModelService);
    getComments(articleId: string): Promise<any>;
    getComments2(articleId: string): Promise<any>;
    postComment(newComment: commentDTO, articleId: string, User: U): Promise<any>;
    getRepliesTo(commentId: string, from: string, size: string): Promise<any>;
    deleteComment(id: any): Promise<unknown[]>;
    dltComment(body: any): Promise<unknown[]>;
    dltComments(id: any): Promise<unknown[]>;
}
