"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticulosModule = void 0;
const common_1 = require("@nestjs/common");
const articles_controller_1 = require("./articles.controller");
const articles_model_service_1 = require("./articles-model.service");
const articuloIndex_1 = require("./articuloIndex");
const categorias_module_1 = require("../categorias/categorias.module");
const s3_module_1 = require("../s3/s3.module");
let ArticulosModule = class ArticulosModule {
};
ArticulosModule = __decorate([
    common_1.Module({
        controllers: [
            articles_controller_1.ArticlesController
        ],
        providers: [
            articles_model_service_1.ArticlesModelService,
            articuloIndex_1.ArticuloIndex,
        ],
        exports: [
            articles_model_service_1.ArticlesModelService,
            articuloIndex_1.ArticuloIndex,
        ],
        imports: [
            common_1.forwardRef(() => categorias_module_1.CategoriasModule),
            s3_module_1.S3Module
        ]
    })
], ArticulosModule);
exports.ArticulosModule = ArticulosModule;
//# sourceMappingURL=articulos.module.js.map