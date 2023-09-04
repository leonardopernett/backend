"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesModule = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("./db.service");
let DatabasesModule = class DatabasesModule {
};
DatabasesModule = __decorate([
    common_1.Global(),
    common_1.Module({
        controllers: [],
        imports: [],
        providers: [
            db_service_1.DbService
        ],
        exports: [
            db_service_1.DbService
        ]
    })
], DatabasesModule);
exports.DatabasesModule = DatabasesModule;
//# sourceMappingURL=databases.module.js.map