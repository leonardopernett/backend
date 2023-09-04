"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModelService = exports.updateNewsDTO = exports.postNewsDTO = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const articuloIndex_1 = require("../articulos/articuloIndex");
const articles_model_service_1 = require("../articulos/articles-model.service");
const db_service_1 = require("../databases/db.service");
const conexion_1 = require("../elastic-search/conexion");
class postNewsDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un titulo a la noticia" }),
    __metadata("design:type", String)
], postNewsDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" }),
    __metadata("design:type", String)
], postNewsDTO.prototype, "content", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" }),
    __metadata("design:type", String)
], postNewsDTO.prototype, "obj", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un estado a la noticia" }),
    __metadata("design:type", String)
], postNewsDTO.prototype, "state", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un estado a la noticia" }),
    __metadata("design:type", String)
], postNewsDTO.prototype, "pcrc", void 0);
exports.postNewsDTO = postNewsDTO;
class updateNewsDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un titulo a la noticia" }),
    __metadata("design:type", String)
], updateNewsDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" }),
    __metadata("design:type", String)
], updateNewsDTO.prototype, "content", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un contenido a la noticia" }),
    __metadata("design:type", String)
], updateNewsDTO.prototype, "obj", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "debes proporcionar un estado a la noticia" }),
    __metadata("design:type", String)
], updateNewsDTO.prototype, "state", void 0);
exports.updateNewsDTO = updateNewsDTO;
let NewsModelService = class NewsModelService {
    constructor(db, articlesModel, articuloIndex) {
        this.db = db;
        this.articlesModel = articlesModel;
        this.articuloIndex = articuloIndex;
        this.getNewsByDate = async (pcrcId, from = '0', size = '20', date) => {
            let result = await this.db.NIK('CALL get_noticias(?,?,?,?)', [pcrcId, date, from, size]);
            if (result.length == 1 && result[0].id == null) {
                return [];
            }
            else {
                return result;
            }
        };
        this.getNewsBorradores = async (pcrcId, from = '0', size = '20') => {
            let result = await this.db.NIK('CALL get_noticias_borradores(?,?,?)', [pcrcId, from, size]);
            if (result.length == 1 && result[0].id == null) {
                return [];
            }
            else {
                return result;
            }
        };
        this.searchNews = async (pcrcId, state = '1', from = '0', size = '20', query) => {
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
                                            'tie_breaker': 0.7,
                                            'fuzziness': 2,
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
            return result;
        };
        this.getSingleNews = async (newsId) => {
            return await this.articlesModel.getArticle(newsId);
        };
        this.postNews = async (news, creator_id) => {
            let [[noticiaCreada]] = await Promise.all([
                this.db.NIK('CALL crear_noticia(?,?,?,?,?,?)', [news.title, news.content, news.obj, news.state, news.pcrc, creator_id]),
            ]);
            let newQuillJsObj = await this.articlesModel.updateArticleImages(noticiaCreada.id.toString(), JSON.parse(noticiaCreada.obj));
            const es = await conexion_1.client();
            await Promise.all([
                es.index({
                    index: 'articulo',
                    id: noticiaCreada.id.toString(),
                    body: {
                        base: news.pcrc,
                        likes: 0,
                        disLikes: 0,
                        favorites: 0,
                        views: 0,
                        publicationDate: (new Date()).getTime(),
                        type: 'noticia',
                        category: null,
                        content: news.content,
                        state: news.state,
                        tags: [],
                        title: news.title
                    }
                }),
                this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)', [noticiaCreada.id.toString(), noticiaCreada.title, noticiaCreada.content, newQuillJsObj, noticiaCreada.state.toString(), creator_id]),
                this.db.NIK('CALL crear_estado_articulo(?,?,?)', [noticiaCreada.id.toString(), noticiaCreada.state.toString(), creator_id]),
                this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)', [noticiaCreada.id.toString(), creator_id, newQuillJsObj, null])
            ]);
            return noticiaCreada;
        };
        this.updateNews = async (id, article, modificationUser_id) => {
            let [prevArticle, objWithoutImages] = await Promise.all([
                this.db.NIK('call get_articulo(?)', [id]),
                this.articlesModel.updateArticleImages(id, article.obj),
            ]);
            let promiseActualizarEstado = null;
            let promiseCambioContenido = null;
            if (article.state.toString() != prevArticle[0].state) {
                promiseActualizarEstado = this.db.NIK('CALL crear_estado_articulo(?,?,?)', [id, article.state.toString(), modificationUser_id]);
            }
            if (objWithoutImages != prevArticle[0].obj) {
                promiseCambioContenido = this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)', [id, modificationUser_id, objWithoutImages, null]);
            }
            const es = await conexion_1.client();
            await Promise.all([
                es.update({
                    index: "articulo",
                    id: id,
                    body: {
                        doc: {
                            content: article.content,
                            title: article.title
                        }
                    }
                }),
                this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)', [id, article.title, article.content, article.obj, article.state.toString(), modificationUser_id]),
                this.articlesModel.compareDeletedImages(id, objWithoutImages, prevArticle[0].obj),
                promiseActualizarEstado,
                promiseCambioContenido,
            ]);
        };
        this.deleteNews = async (idArticulo, iduser) => {
            const es = await conexion_1.client();
            await es.delete({
                index: "articulo",
                id: idArticulo
            });
            await this.articlesModel.deleteArticle(idArticulo, iduser);
        };
    }
};
NewsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService,
        articles_model_service_1.ArticlesModelService,
        articuloIndex_1.ArticuloIndex])
], NewsModelService);
exports.NewsModelService = NewsModelService;
//# sourceMappingURL=news-model.service.js.map