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
exports.ArticleIndex = void 0;
const common_1 = require("@nestjs/common");
const esindex_1 = require("../esindex");
let ArticleIndex = class ArticleIndex extends esindex_1.Esindex {
    constructor() {
        super('articles', process.env.ES_PUNTO_ENLACE);
    }
};
ArticleIndex = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ArticleIndex);
exports.ArticleIndex = ArticleIndex;
//# sourceMappingURL=article-index.js.map