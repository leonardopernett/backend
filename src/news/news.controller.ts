import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from "../jwt/jwt.guard";
import { User } from '../user.decorator';
import { NewsModelService, postNewsDTO, updateNewsDTO } from "./news-model.service";


@Controller('api/news')
export class NewsController {

    constructor(private newsModel:NewsModelService){  }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getSingleNews(
        @Param('id') idNews:string
    ): Promise<any> {
        return this.newsModel.getSingleNews(idNews);
    }

    @UseGuards(JwtGuard)
    @Post()
    async postNews(
        @Body() news: postNewsDTO,
        @User() user: U
    ): Promise<any> {
        return this.newsModel.postNews(news,user.sub)
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updateNews(
        @Body() news: updateNewsDTO,
        @User() user: U,
        @Param('id') idArticulo:string
    ): Promise<any> {
       
        return this.newsModel.updateNews(idArticulo,news,user.sub)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteNews(
        @Param('id') idArticulo:string,
        @User() user: U,
    ): Promise<any> {
        return this.newsModel.deleteNews(idArticulo,user.sub)
    }

}