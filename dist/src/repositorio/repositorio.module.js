"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioModule = void 0;
const common_1 = require("@nestjs/common");
const repositorio_services_1 = require("./repositorio.services");
const respoitorio_controller_1 = require("./respoitorio.controller");
let RepositorioModule = class RepositorioModule {
};
RepositorioModule = __decorate([
    common_1.Module({
        controllers: [
            respoitorio_controller_1.RepositorioController
        ],
        providers: [
            repositorio_services_1.RepositorioServices
        ],
        exports: [
            repositorio_services_1.RepositorioServices
        ],
        imports: []
    })
], RepositorioModule);
exports.RepositorioModule = RepositorioModule;
//# sourceMappingURL=repositorio.module.js.map