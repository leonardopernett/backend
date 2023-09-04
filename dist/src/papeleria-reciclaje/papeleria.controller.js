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
exports.PapeleriaController = void 0;
const common_1 = require("@nestjs/common");
const papeleria_service_1 = require("./papeleria.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let PapeleriaController = class PapeleriaController {
    constructor(papeleriaService) {
        this.papeleriaService = papeleriaService;
    }
    async getAllArticleDelete(res) {
        const articles = await this.papeleriaService.getAllArticledelete();
        return res.json(articles);
    }
    async deleteArticle(id, res) {
        await this.papeleriaService.deleteArticlePermanent(id);
        return res.json({ message: 'articulo eliminado permanentemente de nik' });
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PapeleriaController.prototype, "getAllArticleDelete", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('delete/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PapeleriaController.prototype, "deleteArticle", null);
PapeleriaController = __decorate([
    common_1.Controller('/api/papeleria'),
    __metadata("design:paramtypes", [papeleria_service_1.PapeleriaService])
], PapeleriaController);
exports.PapeleriaController = PapeleriaController;
//# sourceMappingURL=papeleria.controller.js.map