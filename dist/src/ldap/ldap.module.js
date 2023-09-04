"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdapModule = void 0;
const common_1 = require("@nestjs/common");
const ldap_controller_1 = require("./ldap.controller");
const ldap_service_1 = require("./ldap.service");
let LdapModule = class LdapModule {
};
LdapModule = __decorate([
    common_1.Module({
        controllers: [
            ldap_controller_1.LdapController
        ],
        providers: [
            ldap_service_1.LdapModelService,
        ],
        exports: [
            ldap_service_1.LdapModelService
        ],
        imports: []
    })
], LdapModule);
exports.LdapModule = LdapModule;
//# sourceMappingURL=ldap.module.js.map