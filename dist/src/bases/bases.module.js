"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasesModule = void 0;
const common_1 = require("@nestjs/common");
const base_model_service_1 = require("./base-model.service");
const base_controller_1 = require("./base.controller");
const categorias_module_1 = require("../categorias/categorias.module");
const elastic_search_module_1 = require("../elastic-search/elastic-search.module");
const articulos_module_1 = require("../articulos/articulos.module");
const news_module_1 = require("../news/news.module");
let BasesModule = class BasesModule {
};
BasesModule = __decorate([
    common_1.Module({
        controllers: [
            base_controller_1.BaseController
        ],
        providers: [
            base_model_service_1.BaseModelService
        ],
        exports: [
            base_model_service_1.BaseModelService
        ],
        imports: [
            categorias_module_1.CategoriasModule,
            elastic_search_module_1.ElasticSearchModule,
            articulos_module_1.ArticulosModule,
            news_module_1.NewsModule
        ]
    })
], BasesModule);
exports.BasesModule = BasesModule;
//# sourceMappingURL=bases.module.js.map