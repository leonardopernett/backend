"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPageFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let DefaultPageFilter = class DefaultPageFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let url = ctx.getRequest().url;
        if (url.startsWith('/api')) {
            console.log(exception);
            return exception;
        }
        else {
            response.sendFile(path_1.join(__dirname, '../..', 'public/index.html'));
        }
    }
};
DefaultPageFilter = __decorate([
    common_1.Catch(common_1.NotFoundException)
], DefaultPageFilter);
exports.DefaultPageFilter = DefaultPageFilter;
//# sourceMappingURL=default-page.filter.js.map