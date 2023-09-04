"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentariosModule = void 0;
const common_1 = require("@nestjs/common");
const comments_controller_1 = require("./comments.controller");
const comments_model_service_1 = require("./comments-model.service");
let ComentariosModule = class ComentariosModule {
};
ComentariosModule = __decorate([
    common_1.Module({
        controllers: [
            comments_controller_1.CommentsController
        ],
        providers: [
            comments_model_service_1.CommentsModelService
        ],
        exports: [
            comments_model_service_1.CommentsModelService
        ]
    })
], ComentariosModule);
exports.ComentariosModule = ComentariosModule;
//# sourceMappingURL=comentarios.module.js.map