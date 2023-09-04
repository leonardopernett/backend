"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearchModule = void 0;
const common_1 = require("@nestjs/common");
const es_client_controller_1 = require("./es-client.controller");
const search_controller_1 = require("./search.controller");
const es_client_service_1 = require("./es-client.service");
const search_model_service_1 = require("./search-model.service");
const searchIndex_1 = require("./searchIndex");
const articulos_module_1 = require("../articulos/articulos.module");
const user_index_1 = require("./indices/user-index");
const categoria_index_1 = require("./indices/categoria-index");
const article_index_1 = require("./indices/article-index");
const articlesEvents_index_1 = require("./indices/articlesEvents-index");
const articleViews_index_1 = require("./indices/articleViews-index");
const comments_index_1 = require("./indices/comments-index");
const userFavorites_index_1 = require("./indices/userFavorites-index");
const likesUser_index_1 = require("./indices/likesUser-index");
let ElasticSearchModule = class ElasticSearchModule {
};
ElasticSearchModule = __decorate([
    common_1.Module({
        controllers: [
            es_client_controller_1.EsClientController,
            search_controller_1.searchController
        ],
        providers: [
            searchIndex_1.SearchsIndex,
            es_client_service_1.EsClientService,
            search_model_service_1.SearchModelService,
            user_index_1.UserIndex,
            categoria_index_1.CategoriesIndex,
            article_index_1.ArticleIndex,
            articlesEvents_index_1.ArticlesEventsIndex,
            articleViews_index_1.ArticlesViewsIndex,
            comments_index_1.CommentsIndex,
            userFavorites_index_1.FavoriteUserIndex,
            likesUser_index_1.LikeUserIndex
        ],
        exports: [
            es_client_service_1.EsClientService,
            search_model_service_1.SearchModelService,
            categoria_index_1.CategoriesIndex,
            user_index_1.UserIndex,
            article_index_1.ArticleIndex,
            articlesEvents_index_1.ArticlesEventsIndex,
            articleViews_index_1.ArticlesViewsIndex,
            comments_index_1.CommentsIndex,
            userFavorites_index_1.FavoriteUserIndex,
            likesUser_index_1.LikeUserIndex
        ],
        imports: [
            articulos_module_1.ArticulosModule
        ]
    })
], ElasticSearchModule);
exports.ElasticSearchModule = ElasticSearchModule;
//# sourceMappingURL=elastic-search.module.js.map