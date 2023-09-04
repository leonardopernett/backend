import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query, BadRequestException, HttpCode, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesModelService } from '../articulos/articles-model.service';
import { CategoriesModelService, newCategoryDTO, udpateCategoryDTO } from './categories-model.service';
import { JwtGuard } from "../jwt/jwt.guard";
import { VerifyGuard } from '../auth/verifytoken.guard';
import { AutorizationGuard } from '../jwt/autorization.guard';


@Controller('api/categories')
export class CategoriesController {

    constructor(
        private categoriesModel: CategoriesModelService,
        private articlesModel: ArticlesModelService
    ) { }

    @UseGuards(VerifyGuard)
    @Get(':idCategory/articulos')
    async getArticles(
        @Param('idCategory') idCategory: string,
        @Query('query') query: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string
    ): Promise<any> {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query,  { category:idCategory } , state, from, size)
        } else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);        
        }
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post()
    createCategory(
        @Body() Body: newCategoryDTO
    ): Promise<any> {
        return this.categoriesModel.createCategory(Body);
    }

    @UseGuards(JwtGuard)
    @Post('/eliminar')
    deleteCategory(
        @Body() body
    ): Promise<any> {
       
        return this.categoriesModel.deleteCategory(body.categoryId,body.cedula);
       
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateCategory(
        @Param('id') id: string,
        @Body() Body: udpateCategoryDTO
    ): Promise<any> {
        return this.categoriesModel.updateCategory(id, Body);
    }

    @UseGuards(JwtGuard)
    @Get(':idCategory/articles')
    async getArticlesByQuery(
        @Param('idCategory') idCategory: string,
        @Query('query') query: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string
    ): Promise<any> {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query, { category:idCategory }, state, from, size)
        } else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);        
        }
    }

    @UseGuards(AutorizationGuard)
    @Get(':idCategory/articulo')
    async getArticlesByQuery2(
        @Param('idCategory') idCategory: string,
        @Query('query') query: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string
    ): Promise<any> {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query, { category:idCategory }, state, from, size)
        } else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);        
        }
    }

    @Post('/breadcrumbcategoria')
    breadcrumbCategory(
        @Body() body
    ) {
       
        return this.categoriesModel.breadcrumbcategoria(body.idarticulo);
       
    }

    // @UseGuards(JwtGuard)
    // @Get('')
    // async getAll(
    // ): Promise<any> {
    //     return await this.categoriesModel.getAllCategories()
    // }
}