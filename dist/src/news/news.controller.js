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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const user_decorator_1 = require("../user.decorator");
const news_model_service_1 = require("./news-model.service");
let NewsController = class NewsController {
    constructor(newsModel) {
        this.newsModel = newsModel;
    }
    async getSingleNews(idNews) {
        return this.newsModel.getSingleNews(idNews);
    }
    async postNews(news, user) {
        return this.newsModel.postNews(news, user.sub);
    }
    async updateNews(news, user, idArticulo) {
        return this.newsModel.updateNews(idArticulo, news, user.sub);
    }
    async deleteNews(idArticulo, user) {
        return this.newsModel.deleteNews(idArticulo, user.sub);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getSingleNews", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_model_service_1.postNewsDTO, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "postNews", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_model_service_1.updateNewsDTO, Object, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateNews", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteNews", null);
NewsController = __decorate([
    common_1.Controller('api/news'),
    __metadata("design:paramtypes", [news_model_service_1.NewsModelService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map