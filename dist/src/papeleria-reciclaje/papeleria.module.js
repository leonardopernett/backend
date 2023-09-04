"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PapeleriaModule = void 0;
const common_1 = require("@nestjs/common");
const papeleria_controller_1 = require("./papeleria.controller");
const papeleria_service_1 = require("./papeleria.service");
let PapeleriaModule = class PapeleriaModule {
};
PapeleriaModule = __decorate([
    common_1.Module({
        controllers: [
            papeleria_controller_1.PapeleriaController
        ],
        providers: [
            papeleria_service_1.PapeleriaService
        ],
        exports: [
            papeleria_service_1.PapeleriaService
        ],
        imports: []
    })
], PapeleriaModule);
exports.PapeleriaModule = PapeleriaModule;
//# sourceMappingURL=papeleria.module.js.map