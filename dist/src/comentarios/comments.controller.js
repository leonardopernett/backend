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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_model_service_1 = require("./comments-model.service");
const user_decorator_1 = require("../user.decorator");
const jwt_guard_1 = require("../jwt/jwt.guard");
const autorization_guard_1 = require("../jwt/autorization.guard");
let CommentsController = class CommentsController {
    constructor(commentsModel) {
        this.commentsModel = commentsModel;
    }
    async getComments(articleId) {
        return await this.commentsModel.getComments(articleId);
    }
    async getComments2(articleId) {
        return await this.commentsModel.getComments(articleId);
    }
    async postComment(newComment, articleId, User) {
        return this.commentsModel.postComment(newComment.replyTo, newComment.text, articleId, User.sub);
    }
    async getRepliesTo(commentId, from, size) {
        return this.commentsModel.getRepliesTo(commentId, from, size);
    }
    async deleteComment(id) {
        return this.commentsModel.deleteReplies(id);
    }
    async dltComment(body) {
        return this.commentsModel.deleteComment(body.id, body.cedula);
    }
    async dltComments(id) {
        return this.commentsModel.deleteComments(id);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('articles/:articleId/comments'),
    __param(0, common_1.Param('articleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('articles/:articleId/comentarios'),
    __param(0, common_1.Param('articleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('articles/:articleId/comments'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('articleId')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_model_service_1.commentDTO, String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "postComment", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('comments/:commentId/replies'),
    __param(0, common_1.Param('commentId')),
    __param(1, common_1.Query('from')),
    __param(2, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getRepliesTo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('comments/:commentId/repliesdelete'),
    __param(0, common_1.Param('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('comments/deleteComment'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "dltComment", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('comments/:id/deleteComments'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "dltComments", null);
CommentsController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [comments_model_service_1.CommentsModelService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map