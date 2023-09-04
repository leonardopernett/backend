import { BadRequestException, Controller, Get, Param, Query, UseGuards, Post, Body, HttpCode, UseInterceptors, Put, Delete } from '@nestjs/common';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from "../jwt/jwt.guard";
import { CategoriesModelService } from "../categorias/categories-model.service";
import { BaseModelService, postBaseDTO, postSubBaseDTO } from './base-model.service';
import { User } from '../user.decorator';
import { ArticlesModelService } from "../articulos/articles-model.service";
import { NewsModelService } from "../news/news-model.service";
import { SearchModelService } from "../elastic-search/search-model.service";
import { VerifyGuard } from "../auth/verifytoken.guard";
import { AutorizationGuard } from '../jwt/autorization.guard';



@Controller('api/pcrc')
export class BaseController {

    constructor(
        private baseModel: BaseModelService,
        private categoriesModel: CategoriesModelService,
        private searchModel: SearchModelService,
        private articlesModel: ArticlesModelService,
        private newsModel: NewsModelService,
    ) { }

    @UseGuards(VerifyGuard)
    @Get(':idPcrc/categorias')
    async getPcrcCategorie(
        @Param('idPcrc') idPcrc: string
    ): Promise<any> {

        if(idPcrc=="0"){

        return this.categoriesModel.getCategories(idPcrc)

        }else{
            return "Pcrc Invalido"
        }

    }

    @UseGuards(AutorizationGuard)
    @Get(':idPcrc/categoria')
    async getPcrcCategorie2(
        @Param('idPcrc') idPcrc: string
    ): Promise<any> {

        if(idPcrc=="0"){

        return this.categoriesModel.getCategories(idPcrc)

        }else{
            return "Pcrc Invalido"
        }

    }

    @UseGuards(VerifyGuard)
    @Get(':idPcrc/articulos')
    async getArticles(
        @Param('idPcrc') idPcrc: string, 
        @Query('query') query: string,
        @Query('orderby') orderby: string,
        @Query('tag') tag: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string,
        @User() user: U
    ): Promise<any> {
       
       
        if(idPcrc=="0"){ 
           
        if (query) {
        
        if(from == '0'){
            const res = await this.searchModel.newSearch(query, idPcrc, "1102850901")
           
        }

            let didYouMean = await this.searchModel.getDidYouMean(query);

            let result = await this.articlesModel.getArticlesByQuery(query, {base:idPcrc}, state, from, size)
    
            if(!result){
                result = await this.articlesModel.getArticlesByQuery(didYouMean, {base:idPcrc}, state, from, size)
            }

            return result

        }

        if (tag) {
            return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size })
        }

        if(orderby == 'views'){
            return this.articlesModel.getArticlesByView(idPcrc, from, size)
        }

        if(orderby == 'update'){
            return this.articlesModel.getArticlesByUpdate(idPcrc, from, size)
        }

        throw new BadRequestException('falta el parametro query o tag');

    }else{
        return "Pcrc Invalido"
    }

    }

     @UseGuards(JwtGuard) 
    @HttpCode(200)
    @Get('')
    async getAllBases(
        @User() user:U
    ){
        
        let base = await this.baseModel.getAllBases()
        base.push({
            id_dp_clientes: 100,
            cliente: "Admin",
            pcrcs: [
                {
                    "id_dp_pcrc": 2000,
                    "pcrc": "Admin",
                    "cod_pcrc" : 0
                }
            ]
        })
        
        return base
        
    }

    @UseGuards(JwtGuard)
    @Get(':id_base/usuarios')
    async getUsuarios(
        @Param('id_base') idBase: string
    ): Promise<any> {
        return this.baseModel.getBaseUsers(idBase)
    }

    @UseGuards(JwtGuard)
    @Get(':idPcrc/categories')
    async getPcrcCategories(
        @Param('idPcrc') idPcrc: string
    ): Promise<any> {
        return this.categoriesModel.getCategories(idPcrc)
    }

    @UseGuards(JwtGuard)
    @Get(':idPcrc/articles')
    async getArticlesByQuery(
        @Param('idPcrc') idPcrc: string,
        @Param('documento') documento: string,
        @Query('query') query: string,
        @Query('orderby') orderby: string,
        @Query('tag') tag: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string,
        @User() user: U
    ): Promise<any> {

        if (query) {

            if(from == '0'){
                await this.searchModel.newSearch(query, idPcrc, user.sub)
            }

            let didYouMean = await this.searchModel.getDidYouMean(query);

           let result = await this.articlesModel.getArticlesByQuery(query, {base:idPcrc}, state, from, size)
            
           if(!result){
            result = await this.articlesModel.getArticlesByQuery(didYouMean, { base:idPcrc }, state, from, size)
            }

          
            return result



        }

        if (tag) {
            return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size })
        }

        if(orderby == 'views'){
            return this.articlesModel.getArticlesByView(idPcrc, from, size)
        }

        if(orderby == 'update'){
            return this.articlesModel.getArticlesByUpdate(idPcrc, from, size)
        }


        throw new BadRequestException('falta el parametro query o tag');

    }


    @UseGuards(JwtGuard)
    @Get(':idPcrc/:documento/articulosObligatorios')
    async getArticlesByRequired(
        @Param('idPcrc') idPcrc,
        @Param('documento') documento,
        @Query('from') from,
        @Query('size') size,
    ): Promise<any> {

    return await this.articlesModel.getArticlesByRequired(idPcrc,documento, from, size) 


    }


    @UseGuards(AutorizationGuard)
    @Get(':idPcrc/articulo')
    async getArticlesByQuery2(
        @Param('idPcrc') idPcrc: string,
        @Query('query') query: string,
        @Query('orderby') orderby: string,
        @Query('tag') tag: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('state') state: string,
        @User() user: U
    ): Promise<any> {
        if (query) {

            if(from == '0'){
                await this.searchModel.newSearch(query, idPcrc, user.sub)
            }

            let didYouMean = await this.searchModel.getDidYouMean(query);

           let result = await this.articlesModel.getArticlesByQuery(query, {base:idPcrc}, state, from, size)

           if(!result){
            result = await this.articlesModel.getArticlesByQuery(didYouMean, { base:idPcrc }, state, from, size)
            }

          
            return result



        }

        if (tag) {
            return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size })
        }

        if(orderby == 'views'){
            return this.articlesModel.getArticlesByView(idPcrc, from, size)
        }

        if(orderby == 'update'){
            return this.articlesModel.getArticlesByUpdate(idPcrc, from, size)
        }

        throw new BadRequestException('falta el parametro query o tag');

    }

    @UseGuards(JwtGuard)
    @Get(':idPcrc/news')
    async getNews(
        @Param('idPcrc') idPcrc: string,        
        @Query('query') query: string,
        @Query('state') state: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('date') date: string
    ): Promise<any> {

        if(query){
            return await this.newsModel.searchNews(idPcrc, state, from, size, query)
        }

        if(date){
            
            return await this.newsModel.getNewsByDate(idPcrc, from, size, date)
        }

        return this.newsModel.getNewsBorradores(idPcrc, from, size)

    }

    @UseGuards(AutorizationGuard)
    @Get(':idPcrc/nuevo')
    async getNews2(
        @Param('idPcrc') idPcrc: string,        
        @Query('query') query: string,
        @Query('state') state: string,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('date') date: string
    ): Promise<any> {

        if(query){
            return await this.newsModel.searchNews(idPcrc, state, from, size, query)
        }

        if(date){
            
            return await this.newsModel.getNewsByDate(idPcrc, from, size, date)
        }

        return this.newsModel.getNewsBorradores(idPcrc, from, size)

    }

    @UseGuards(JwtGuard)
    @Get(':idPcrc/suggestions')
    async getSuggestions(
        @Query('input') input: string,
        @Param('idPcrc') idPcrc: string) {
       
        if (idPcrc && input) { 
            return this.searchModel.getSuggestions(input, idPcrc).catch(error=>console.log(error));
        } else if (idPcrc) {
            return this.searchModel.getBySubline(idPcrc);
        } else {
            return this.searchModel.getAll();
        }
    }

    @UseGuards(JwtGuard)
    @Get(':idPcrc/didYouMean')
    async getDidYouMean(
        @Query('input') input: string,
        @Param('idPcrc') idPcrc: string) {
            return this.searchModel.getDidYouMean(input);
    }

    @UseGuards(JwtGuard)
    @Get(':id_base/canCopy')
    async puedeCopiar(
        @Param('id_base') idBase: string
    ): Promise<any> {
        return this.baseModel.puedeCopiar(idBase)
    }

    @UseGuards(JwtGuard)
    @Put(':id_base/canCopy')
    async cambiarPermisoCopiar(
        @Param('id_base') idBase: string
    ): Promise<any> {
        return this.baseModel.cambiarPermisoCopiar(idBase)
    }
    

    @UseGuards(JwtGuard)
    @Post('/savebase')
    async saveBase(
        @Body() body
    ) {
        return this.baseModel.savebase(body.base)
    }

    @UseGuards(JwtGuard)
    @Post('/savepcrc')
    async savePcrc(
        @Body() body
    ) {
       
        return this.baseModel.savepcrc(body.pcrc,body.base_id)
    }

    @UseGuards(JwtGuard)
    @Get('/viewbase')
    async viewBase() {
        return this.baseModel.viewbase()
    }

    @UseGuards(JwtGuard)
    @Put('/updatebase')
    async updateBase(
        @Body() body
    ) { 
        return this.baseModel.updatebase(body.idbase,body.base)
    }

    @UseGuards(JwtGuard)
    @Put('/updatepcrc')
    async updatePcrc(
        @Body() body
    ) { 
        return this.baseModel.updatepcrc(body.idpcrc,body.pcrc,body.base_id)
    }

    @UseGuards(JwtGuard)
    @Delete('/deletebase/:idbase')
    async deleteBase(
        @Param('idbase') idbase
    ) {
        return this.baseModel.deletebase(idbase)
    }

    @UseGuards(JwtGuard)
    @Delete('/deletepcrc/:idpcrc')
    async deletePcrc(
        @Param('idpcrc') idpcrc
    ) {
        return this.baseModel.deletepcrc(idpcrc)
    }

    @UseGuards(JwtGuard)
    @Get('/viewpcrc/:idbase')
    async viewpcrc(
        @Param('idbase') idbase
    ) {
        return this.baseModel.viewpcrc(idbase)
    }

}