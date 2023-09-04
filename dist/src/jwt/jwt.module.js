"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtModule = void 0;
const common_1 = require("@nestjs/common");
const autorization_guard_1 = require("./autorization.guard");
const jwt_guard_1 = require("./jwt.guard");
const refreshjwt_guard_1 = require("./refreshjwt.guard");
const userjwt_model_service_1 = require("./userjwt-model.service");
let JwtModule = class JwtModule {
};
JwtModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            jwt_guard_1.JwtGuard,
            refreshjwt_guard_1.RefreshJwtGuard,
            userjwt_model_service_1.UserjwtModelService,
            autorization_guard_1.AutorizationGuard
        ],
        exports: [
            jwt_guard_1.JwtGuard,
            refreshjwt_guard_1.RefreshJwtGuard,
            userjwt_model_service_1.UserjwtModelService,
            autorization_guard_1.AutorizationGuard
        ]
    })
], JwtModule);
exports.JwtModule = JwtModule;
//# sourceMappingURL=jwt.module.js.map