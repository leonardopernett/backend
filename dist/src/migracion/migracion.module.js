"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigracionModule = void 0;
const common_1 = require("@nestjs/common");
const migracion_controller_1 = require("./migracion.controller");
const migracion_model_service_1 = require("./migracion-model.service");
const elastic_search_module_1 = require("../elastic-search/elastic-search.module");
const articulos_module_1 = require("../articulos/articulos.module");
let MigracionModule = class MigracionModule {
};
MigracionModule = __decorate([
    common_1.Module({
        controllers: [migracion_controller_1.MigracionController],
        providers: [migracion_model_service_1.MigracionModelService],
        imports: [
            elastic_search_module_1.ElasticSearchModule,
            articulos_module_1.ArticulosModule
        ]
    })
], MigracionModule);
exports.MigracionModule = MigracionModule;
//# sourceMappingURL=migracion.module.js.map