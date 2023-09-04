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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const articles_model_service_1 = require("../articulos/articles-model.service");
const categories_model_service_1 = require("./categories-model.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
const verifytoken_guard_1 = require("../auth/verifytoken.guard");
const autorization_guard_1 = require("../jwt/autorization.guard");
let CategoriesController = class CategoriesController {
    constructor(categoriesModel, articlesModel) {
        this.categoriesModel = categoriesModel;
        this.articlesModel = articlesModel;
    }
    async getArticles(idCategory, query, from, size, state) {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query, { category: idCategory }, state, from, size);
        }
        else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);
        }
    }
    createCategory(Body) {
        return this.categoriesModel.createCategory(Body);
    }
    deleteCategory(body) {
        return this.categoriesModel.deleteCategory(body.categoryId, body.cedula);
    }
    updateCategory(id, Body) {
        return this.categoriesModel.updateCategory(id, Body);
    }
    async getArticlesByQuery(idCategory, query, from, size, state) {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query, { category: idCategory }, state, from, size);
        }
        else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);
        }
    }
    async getArticlesByQuery2(idCategory, query, from, size, state) {
        if (query) {
            return this.articlesModel.getArticlesByQuery(query, { category: idCategory }, state, from, size);
        }
        else {
            return this.articlesModel.getArticlesByCategory(idCategory, state, from, size);
        }
    }
    breadcrumbCategory(body) {
        return this.categoriesModel.breadcrumbcategoria(body.idarticulo);
    }
};
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Get(':idCategory/articulos'),
    __param(0, common_1.Param('idCategory')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('from')),
    __param(3, common_1.Query('size')),
    __param(4, common_1.Query('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getArticles", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_model_service_1.newCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('/eliminar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_model_service_1.udpateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idCategory/articles'),
    __param(0, common_1.Param('idCategory')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('from')),
    __param(3, common_1.Query('size')),
    __param(4, common_1.Query('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getArticlesByQuery", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get(':idCategory/articulo'),
    __param(0, common_1.Param('idCategory')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('from')),
    __param(3, common_1.Query('size')),
    __param(4, common_1.Query('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getArticlesByQuery2", null);
__decorate([
    common_1.Post('/breadcrumbcategoria'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "breadcrumbCategory", null);
CategoriesController = __decorate([
    common_1.Controller('api/categories'),
    __metadata("design:paramtypes", [categories_model_service_1.CategoriesModelService,
        articles_model_service_1.ArticlesModelService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map