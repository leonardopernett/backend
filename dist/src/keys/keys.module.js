"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysModule = void 0;
const common_1 = require("@nestjs/common");
const keys_controller_1 = require("./keys.controller");
const keys_service_1 = require("./keys.service");
let KeysModule = class KeysModule {
};
KeysModule = __decorate([
    common_1.Module({
        controllers: [
            keys_controller_1.KeysController
        ],
        providers: [
            keys_service_1.KeysService,
        ],
        exports: [
            keys_service_1.KeysService
        ],
        imports: []
    })
], KeysModule);
exports.KeysModule = KeysModule;
//# sourceMappingURL=keys.module.js.map