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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const categories_model_service_1 = require("../categorias/categories-model.service");
const base_model_service_1 = require("./base-model.service");
const user_decorator_1 = require("../user.decorator");
const articles_model_service_1 = require("../articulos/articles-model.service");
const news_model_service_1 = require("../news/news-model.service");
const search_model_service_1 = require("../elastic-search/search-model.service");
const verifytoken_guard_1 = require("../auth/verifytoken.guard");
const autorization_guard_1 = require("../jwt/autorization.guard");
let BaseController = class BaseController {
    constructor(baseModel, categoriesModel, searchModel, articlesModel, newsModel) {
        this.baseModel = baseModel;
        this.categoriesModel = categoriesModel;
        this.searchModel = searchModel;
        this.articlesModel = articlesModel;
        this.newsModel = newsModel;
    }
    async getPcrcCategorie(idPcrc) {
        if (idPcrc == "0") {
            return this.categoriesModel.getCategories(idPcrc);
        }
        else {
            return "Pcrc Invalido";
        }
    }
    async getPcrcCategorie2(idPcrc) {
        if (idPcrc == "0") {
            return this.categoriesModel.getCategories(idPcrc);
        }
        else {
            return "Pcrc Invalido";
        }
    }
    async getArticles(idPcrc, query, orderby, tag, from, size, state, user) {
        if (idPcrc == "0") {
            if (query) {
                if (from == '0') {
                    const res = await this.searchModel.newSearch(query, idPcrc, "1102850901");
                }
                let didYouMean = await this.searchModel.getDidYouMean(query);
                let result = await this.articlesModel.getArticlesByQuery(query, { base: idPcrc }, state, from, size);
                if (!result) {
                    result = await this.articlesModel.getArticlesByQuery(didYouMean, { base: idPcrc }, state, from, size);
                }
                return result;
            }
            if (tag) {
                return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size });
            }
            if (orderby == 'views') {
                return this.articlesModel.getArticlesByView(idPcrc, from, size);
            }
            if (orderby == 'update') {
                return this.articlesModel.getArticlesByUpdate(idPcrc, from, size);
            }
            throw new common_1.BadRequestException('falta el parametro query o tag');
        }
        else {
            return "Pcrc Invalido";
        }
    }
    async getAllBases(user) {
        let base = await this.baseModel.getAllBases();
        base.push({
            id_dp_clientes: 100,
            cliente: "Admin",
            pcrcs: [
                {
                    "id_dp_pcrc": 2000,
                    "pcrc": "Admin",
                    "cod_pcrc": 0
                }
            ]
        });
        return base;
    }
    async getUsuarios(idBase) {
        return this.baseModel.getBaseUsers(idBase);
    }
    async getPcrcCategories(idPcrc) {
        return this.categoriesModel.getCategories(idPcrc);
    }
    async getArticlesByQuery(idPcrc, documento, query, orderby, tag, from, size, state, user) {
        if (query) {
            if (from == '0') {
                await this.searchModel.newSearch(query, idPcrc, user.sub);
            }
            let didYouMean = await this.searchModel.getDidYouMean(query);
            let result = await this.articlesModel.getArticlesByQuery(query, { base: idPcrc }, state, from, size);
            if (!result) {
                result = await this.articlesModel.getArticlesByQuery(didYouMean, { base: idPcrc }, state, from, size);
            }
            return result;
        }
        if (tag) {
            return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size });
        }
        if (orderby == 'views') {
            return this.articlesModel.getArticlesByView(idPcrc, from, size);
        }
        if (orderby == 'update') {
            return this.articlesModel.getArticlesByUpdate(idPcrc, from, size);
        }
        throw new common_1.BadRequestException('falta el parametro query o tag');
    }
    async getArticlesByRequired(idPcrc, documento, from, size) {
        return await this.articlesModel.getArticlesByRequired(idPcrc, documento, from, size);
    }
    async getArticlesByQuery2(idPcrc, query, orderby, tag, from, size, state, user) {
        if (query) {
            if (from == '0') {
                await this.searchModel.newSearch(query, idPcrc, user.sub);
            }
            let didYouMean = await this.searchModel.getDidYouMean(query);
            let result = await this.articlesModel.getArticlesByQuery(query, { base: idPcrc }, state, from, size);
            if (!result) {
                result = await this.articlesModel.getArticlesByQuery(didYouMean, { base: idPcrc }, state, from, size);
            }
            return result;
        }
        if (tag) {
            return this.articlesModel.getArticlesByTag({ subline: idPcrc, tag: tag, from: from, size: size });
        }
        if (orderby == 'views') {
            return this.articlesModel.getArticlesByView(idPcrc, from, size);
        }
        if (orderby == 'update') {
            return this.articlesModel.getArticlesByUpdate(idPcrc, from, size);
        }
        throw new common_1.BadRequestException('falta el parametro query o tag');
    }
    async getNews(idPcrc, query, state, from, size, date) {
        if (query) {
            return await this.newsModel.searchNews(idPcrc, state, from, size, query);
        }
        if (date) {
            return await this.newsModel.getNewsByDate(idPcrc, from, size, date);
        }
        return this.newsModel.getNewsBorradores(idPcrc, from, size);
    }
    async getNews2(idPcrc, query, state, from, size, date) {
        if (query) {
            return await this.newsModel.searchNews(idPcrc, state, from, size, query);
        }
        if (date) {
            return await this.newsModel.getNewsByDate(idPcrc, from, size, date);
        }
        return this.newsModel.getNewsBorradores(idPcrc, from, size);
    }
    async getSuggestions(input, idPcrc) {
        if (idPcrc && input) {
            return this.searchModel.getSuggestions(input, idPcrc).catch(error => console.log(error));
        }
        else if (idPcrc) {
            return this.searchModel.getBySubline(idPcrc);
        }
        else {
            return this.searchModel.getAll();
        }
    }
    async getDidYouMean(input, idPcrc) {
        return this.searchModel.getDidYouMean(input);
    }
    async puedeCopiar(idBase) {
        return this.baseModel.puedeCopiar(idBase);
    }
    async cambiarPermisoCopiar(idBase) {
        return this.baseModel.cambiarPermisoCopiar(idBase);
    }
    async saveBase(body) {
        return this.baseModel.savebase(body.base);
    }
    async savePcrc(body) {
        return this.baseModel.savepcrc(body.pcrc, body.base_id);
    }
    async viewBase() {
        return this.baseModel.viewbase();
    }
    async updateBase(body) {
        return this.baseModel.updatebase(body.idbase, body.base);
    }
    async updatePcrc(body) {
        return this.baseModel.updatepcrc(body.idpcrc, body.pcrc, body.base_id);
    }
    async deleteBase(idbase) {
        return this.baseModel.deletebase(idbase);
    }
    async deletePcrc(idpcrc) {
        return this.baseModel.deletepcrc(idpcrc);
    }
    async viewpcrc(idbase) {
        return this.baseModel.viewpcrc(idbase);
    }
};
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Get(':idPcrc/categorias'),
    __param(0, common_1.Param('idPcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getPcrcCategorie", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get(':idPcrc/categoria'),
    __param(0, common_1.Param('idPcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getPcrcCategorie2", null);
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Get(':idPcrc/articulos'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('orderby')),
    __param(3, common_1.Query('tag')),
    __param(4, common_1.Query('from')),
    __param(5, common_1.Query('size')),
    __param(6, common_1.Query('state')),
    __param(7, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getArticles", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get(''),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getAllBases", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id_base/usuarios'),
    __param(0, common_1.Param('id_base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getUsuarios", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/categories'),
    __param(0, common_1.Param('idPcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getPcrcCategories", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/articles'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Param('documento')),
    __param(2, common_1.Query('query')),
    __param(3, common_1.Query('orderby')),
    __param(4, common_1.Query('tag')),
    __param(5, common_1.Query('from')),
    __param(6, common_1.Query('size')),
    __param(7, common_1.Query('state')),
    __param(8, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getArticlesByQuery", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/:documento/articulosObligatorios'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Param('documento')),
    __param(2, common_1.Query('from')),
    __param(3, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getArticlesByRequired", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get(':idPcrc/articulo'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('orderby')),
    __param(3, common_1.Query('tag')),
    __param(4, common_1.Query('from')),
    __param(5, common_1.Query('size')),
    __param(6, common_1.Query('state')),
    __param(7, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getArticlesByQuery2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/news'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('state')),
    __param(3, common_1.Query('from')),
    __param(4, common_1.Query('size')),
    __param(5, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getNews", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get(':idPcrc/nuevo'),
    __param(0, common_1.Param('idPcrc')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('state')),
    __param(3, common_1.Query('from')),
    __param(4, common_1.Query('size')),
    __param(5, common_1.Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getNews2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/suggestions'),
    __param(0, common_1.Query('input')),
    __param(1, common_1.Param('idPcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getSuggestions", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idPcrc/didYouMean'),
    __param(0, common_1.Query('input')),
    __param(1, common_1.Param('idPcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getDidYouMean", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id_base/canCopy'),
    __param(0, common_1.Param('id_base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "puedeCopiar", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id_base/canCopy'),
    __param(0, common_1.Param('id_base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "cambiarPermisoCopiar", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/savebase'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "saveBase", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/savepcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "savePcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/viewbase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "viewBase", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put('/updatebase'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "updateBase", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put('/updatepcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "updatePcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('/deletebase/:idbase'),
    __param(0, common_1.Param('idbase')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "deleteBase", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('/deletepcrc/:idpcrc'),
    __param(0, common_1.Param('idpcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "deletePcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/viewpcrc/:idbase'),
    __param(0, common_1.Param('idbase')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "viewpcrc", null);
BaseController = __decorate([
    common_1.Controller('api/pcrc'),
    __metadata("design:paramtypes", [base_model_service_1.BaseModelService,
        categories_model_service_1.CategoriesModelService,
        search_model_service_1.SearchModelService,
        articles_model_service_1.ArticlesModelService,
        news_model_service_1.NewsModelService])
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map