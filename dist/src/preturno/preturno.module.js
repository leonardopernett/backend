"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreturnoModule = void 0;
const common_1 = require("@nestjs/common");
const preturno_controller_1 = require("./preturno.controller");
const preturno_model_service_1 = require("./preturno-model.service");
let PreturnoModule = class PreturnoModule {
};
PreturnoModule = __decorate([
    common_1.Module({
        controllers: [
            preturno_controller_1.PreturnoController
        ],
        providers: [
            preturno_model_service_1.PreturnoModelService,
        ],
        exports: [
            preturno_model_service_1.PreturnoModelService
        ],
        imports: []
    })
], PreturnoModule);
exports.PreturnoModule = PreturnoModule;
//# sourceMappingURL=preturno.module.js.map