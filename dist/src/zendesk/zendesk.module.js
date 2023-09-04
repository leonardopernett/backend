"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZendeskModule = void 0;
const common_1 = require("@nestjs/common");
const zendesk_controller_1 = require("./zendesk.controller");
const zendesk_model_service_1 = require("./zendesk-model.service");
let ZendeskModule = class ZendeskModule {
};
ZendeskModule = __decorate([
    common_1.Module({
        controllers: [
            zendesk_controller_1.ZendeskController
        ],
        providers: [
            zendesk_model_service_1.ZendeskModelService,
        ],
        exports: [
            zendesk_model_service_1.ZendeskModelService
        ],
        imports: []
    })
], ZendeskModule);
exports.ZendeskModule = ZendeskModule;
//# sourceMappingURL=zendesk.module.js.map