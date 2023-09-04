import { HttpException, Injectable } from '@nestjs/common';

enum FiltersToFieldEnum {
    categoria = 'category',
    pcrc = 'pcrc',
    cliente = 'cliente',
    articulo = 'articleId',
    director = 'director',
    coordinador = 'coordinador',
    gerente = 'gerente',
    lider = 'lider'
};

@Injectable()
export class ReportsModelService {  

    // private aceptedData = [
    //     'views',
    //     'favs',	
    //     'likes',
    //     'dislikes',
    //     'articles',
        
    //     'lectures',
    //     'comments',
    //     'subcategoríes',
    //     'categories',
    //     'lines'
    // ]

    // private esFilters = [
    //     'categoria',
    //     'pcrc',
    //     'cliente'
    // ]

    // constructor(
    //     private articlesViewsIndex:ArticlesViewsIndex
    // ){  }

    // async getReport(fromdate: string, todate: string, filterfield: string, filtervalue: string, data: string) {
    //     if( !!FiltersToFieldEnum[filterfield] && this.aceptedData.includes(data) ){
    //       if( data == 'views' ){
    //         return await this.getViewsBy(filterfield, filtervalue)
    //       }
    //     } else {
    //         let errorCode = 12;

    //         throw new HttpException({
    //             "error": `error code: ${errorCode}`,
    //             "message": "not_soported"
    //         }, 400)
    //     }
    // }

    // async getViewsBy(filterfield:string, filtervalue:string){
    //     if( !!FiltersToFieldEnum[filterfield] ){
    //         // return await this.articlesViewsIndex.aggsWhere(R.objOf(filtervalue, FiltersToFieldEnum[filterfield]), { field:"articleId", op:" " })
    //     } else {

    //     }
    // }

}