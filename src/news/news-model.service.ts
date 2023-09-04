import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { ArticuloIndex } from "../articulos/articuloIndex";
import { ArticlesModelService } from "../articulos/articles-model.service";
import { articuloRaw } from "../articulos/entities";
import { DbService } from "../databases/db.service";
import {client} from "../elastic-search/conexion";
 

export class postNewsDTO {

    @IsNotEmpty({ message: "debes proporcionar un titulo a la noticia" })
    title: string;

    @IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" })
    content: string;

    @IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" })
    obj: string;

    @IsNotEmpty({ message: "debes proporcionar un estado a la noticia" })
    state: string;
    
    @IsNotEmpty({ message: "debes proporcionar un estado a la noticia" })
    pcrc: string;
}

export class updateNewsDTO {

    @IsNotEmpty({ message: "debes proporcionar un titulo a la noticia" })
    title: string;

    @IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" })
    content: string;

    @IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" })
    obj: string;

    @IsNotEmpty({ message: "debes proporcionar un estado a la noticia" })
    state: string;
}

@Injectable()
export class NewsModelService {

    constructor(
        private db:DbService,
        private articlesModel: ArticlesModelService,
        private articuloIndex: ArticuloIndex,
    ) { }

    getNewsByDate = async (pcrcId: string, from = '0', size = '20', date ) => {

        let result = await this.db.NIK<(articuloRaw & { fecha_creacion:string })>('CALL get_noticias(?,?,?,?)',[pcrcId, date, from, size ])
        if(result.length == 1 && result[0].id == null){
           return []
        } else {
            return result
        }
    }

    getNewsBorradores = async (pcrcId: string, from = '0', size = '20') => {

        let result = await this.db.NIK<(articuloRaw & { fecha_creacion_borrador:string })>('CALL get_noticias_borradores(?,?,?)',[pcrcId, from, size ])
        
        if(result.length == 1 && result[0].id == null){
           return []    
        } else {
            return result
        }

    }

    searchNews = async (pcrcId: string, state = '1' ,from = '0', size = '20', query:string ) => {
        
        let q = {
            query: {
                function_score: {
                    query: {                        
                        bool: {
                            must: [
                                {
                                    multi_match: {
                                        'query': query,
                                        'fields': ['title^3', 'content^2'],
                                        'tie_breaker' : 0.7,
                                        'fuzziness' : 2,
                                        'prefix_length': 3
                                    }
                                }
                            ],
                            filter: [
                                { 'term': { 'type': 'noticia' } },
                                { 'term': { 'base': pcrcId } },
                                { 'term': { 'state': state } }
                            ]
                        }
                    }
                    //!corregir la puntuacion por fecha
                    // ,exp: {
                    //     publicationDate: {
                    //         scale: "60d",
                    //         offset: "30d",
                    //         decay: 0.8
                    //     }
                    // }
                }
            },
            from: parseInt(from),
            size: parseInt(size),
            highlight: {
                fields: {
                    "content": { "type": "plain" }
                }
            }
        };

        let result = await this.articuloIndex.query(q);

        return result

    }

    getSingleNews = async (newsId: string) => {
       return await this.articlesModel.getArticle(newsId)
    }

    postNews = async (news: postNewsDTO, creator_id: string) => {
            
        let [[noticiaCreada]] = await Promise.all([
            this.db.NIK<articuloRaw>('CALL crear_noticia(?,?,?,?,?,?)',[ news.title, news.content, news.obj, news.state, news.pcrc,creator_id ]),
        ])

        let newQuillJsObj = await this.articlesModel.updateArticleImages(noticiaCreada.id.toString(), JSON.parse(noticiaCreada.obj))

     

        const es=await client()

        await Promise.all([            
            es.index({
                index:'articulo',
                id:noticiaCreada.id.toString(),
                    body:{
                        base: news.pcrc,
                        likes: 0,
                        disLikes: 0,
                        favorites: 0,
                        views: 0,
                        publicationDate:(new Date()).getTime(),
                        type:'noticia',
                        category: null,
                content: news.content,
                state:news.state,
                tags:[],
                title:news.title
                        }
            }),
            this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)',[noticiaCreada.id.toString(), noticiaCreada.title, noticiaCreada.content, newQuillJsObj, noticiaCreada.state.toString(),creator_id]),
            this.db.NIK('CALL crear_estado_articulo(?,?,?)',[noticiaCreada.id.toString(), noticiaCreada.state.toString(), creator_id]),
            this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)',[noticiaCreada.id.toString(), creator_id, newQuillJsObj,null])
        ])

        return noticiaCreada
    }

    public updateNews = async (id: string, article: Partial<updateNewsDTO>, modificationUser_id: string): Promise<any> => {

        let [prevArticle, objWithoutImages] = await Promise.all([
            this.db.NIK<articuloRaw>('call get_articulo(?)',[id]),
            this.articlesModel.updateArticleImages(id, article.obj),
        ])

        let promiseActualizarEstado:Promise<any> = null
        let promiseCambioContenido:Promise<any> = null

        if(article.state.toString() != prevArticle[0].state){
            promiseActualizarEstado = this.db.NIK('CALL crear_estado_articulo(?,?,?)',[id, article.state.toString(), modificationUser_id])
        }

        if(objWithoutImages != prevArticle[0].obj){
            promiseCambioContenido = this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)',[id, modificationUser_id, objWithoutImages,null])
        }

        const es=await client()

        await Promise.all([
            es.update({
                index: "articulo",
                id: id,
                body: {
                    doc: {
                        content:article.content,
                        title:article.title
                    }
                }
            }),
            this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)',[id, article.title, article.content, article.obj, article.state.toString(),modificationUser_id]),
            this.articlesModel.compareDeletedImages( id, objWithoutImages, prevArticle[0].obj),
            promiseActualizarEstado,
            promiseCambioContenido,
        ])

    }

    deleteNews = async (idArticulo: string,iduser): Promise<any> => {

        const es=await client()

        await es.delete({
            index: "articulo",
            id: idArticulo
            }); 

        await this.articlesModel.deleteArticle(idArticulo,iduser)
    }


}