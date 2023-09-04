"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasModule = void 0;
const common_1 = require("@nestjs/common");
const categories_controller_1 = require("./categories.controller");
const categories_model_service_1 = require("./categories-model.service");
const articulos_module_1 = require("../articulos/articulos.module");
let CategoriasModule = class CategoriasModule {
};
CategoriasModule = __decorate([
    common_1.Module({
        controllers: [
            categories_controller_1.CategoriesController
        ],
        providers: [
            categories_model_service_1.CategoriesModelService
        ],
        exports: [
            categories_model_service_1.CategoriesModelService
        ],
        imports: [
            common_1.forwardRef(() => articulos_module_1.ArticulosModule)
        ]
    })
], CategoriasModule);
exports.CategoriasModule = CategoriasModule;
//# sourceMappingURL=categorias.module.js.map