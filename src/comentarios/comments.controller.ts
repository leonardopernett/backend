import { Controller, UseGuards, Get, Param, Post, Body, Query, UseInterceptors, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsModelService, commentDTO } from "./comments-model.service";
import { User } from '../user.decorator';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from "../jwt/jwt.guard";
import { AutorizationGuard } from '../jwt/autorization.guard';


@Controller('api')
export class CommentsController {

    constructor(private commentsModel:CommentsModelService){  }

    @UseGuards(JwtGuard)

    @Get('articles/:articleId/comments')
    async getComments(
        @Param('articleId') articleId:string,
    ): Promise<any> {
        return  await this.commentsModel.getComments(articleId)
    }


    @UseGuards(AutorizationGuard)
    @Get('articles/:articleId/comentarios')
    async getComments2(
        @Param('articleId') articleId:string,
    ): Promise<any> {
        return  await this.commentsModel.getComments(articleId)
    }


    
    @UseGuards(JwtGuard)
    @Post('articles/:articleId/comments')
    async postComment(
        @Body() newComment:commentDTO,
        @Param('articleId') articleId:string,
        @User() User:U
    ): Promise<any> {
        
        return this.commentsModel.postComment(newComment.replyTo,newComment.text, articleId, User.sub)
    }

    @UseGuards(JwtGuard)
    @Get('comments/:commentId/replies')
    async getRepliesTo(
        @Param('commentId') commentId:string,
        @Query('from') from: string,
        @Query('size') size: string
    ): Promise<any> {
        return this.commentsModel.getRepliesTo(commentId, from, size)
    }


    @UseGuards(JwtGuard)
    @Delete('comments/:commentId/repliesdelete')
    async deleteComment(@Param('commentId') id) {

        return this.commentsModel.deleteReplies(id);
        
    }

    @UseGuards(JwtGuard)
    @Post('comments/deleteComment')
    async dltComment(@Body() body) {

        return this.commentsModel.deleteComment(body.id, body.cedula);
        
    }

    @UseGuards(JwtGuard)
    @Delete('comments/:id/deleteComments')
    async dltComments(@Param('id') id) {

        return this.commentsModel.deleteComments(id);
        
    }

}