"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const jwt_guard_1 = require("../jwt/jwt.guard");
const refreshjwt_guard_1 = require("../jwt/refreshjwt.guard");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const userjwt_model_service_1 = require("../jwt/userjwt-model.service");
const bases_module_1 = require("../bases/bases.module");
const AD = require('activedirectory2').promiseWrapper;
const AD2 = require('activedirectory2').promiseWrapper;
const AD3 = require('activedirectory2').promiseWrapper;
const AD4 = require('activedirectory2').promiseWrapper;
const newAsignacionBases_1 = require("./newAsignacionBases");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        controllers: [
            auth_controller_1.AuthController
        ],
        providers: [
            jwt_guard_1.JwtGuard,
            newAsignacionBases_1.newAsignacionBases,
            refreshjwt_guard_1.RefreshJwtGuard,
            userjwt_model_service_1.UserjwtModelService,
            {
                provide: 'activeDirectory',
                useFactory: () => {
                    const config = {
                        url: 'ldap://172.20.1.220',
                        baseDN: 'dc=multienlace,dc=com,dc=co',
                        username: process.env.BIND_DN,
                        password: process.env.BIND_CREDENTIALS,
                        attributes: {
                            "user": [
                                'postOfficeBox', 'cn', 'sAMAccountName'
                            ]
                        }
                    };
                    return new AD(config);
                }
            },
            {
                provide: 'activeDirectory4',
                useFactory: () => {
                    const config = {
                        url: 'ldap://172.20.1.220',
                        baseDN: 'dc=multienlace,dc=com,dc=co',
                        username: process.env.BIND_DN,
                        password: process.env.BIND_CREDENTIALS,
                        attributes: {
                            "user": [
                                'postOfficeBox', 'cn', 'sAMAccountName'
                            ]
                        }
                    };
                    return new AD4(config);
                }
            },
            {
                provide: 'activeDirectory2',
                useFactory: () => {
                    const config = {
                        url: 'ldap://10.164.62.100',
                        baseDN: 'dc=co,dc=grupodigitex,dc=com ',
                        username: 'nikappco@co.grupodigitex.com',
                        password: 'Colombia123456',
                        attributes: {
                            "user": [
                                'postOfficeBox', 'cn', 'sAMAccountName'
                            ]
                        }
                    };
                    return new AD2(config);
                }
            },
            {
                provide: 'activeDirectory3',
                useFactory: () => {
                    const config = {
                        url: 'ldap://10.162.250.80',
                        baseDN: 'dc=fscomdata,dc=loc',
                        username: 'nikappfs@fscomdata.loc',
                        password: 'Colombia123456',
                        attributes: {
                            "user": [
                                'postOfficeBox', 'cn', 'sAMAccountName'
                            ]
                        }
                    };
                    return new AD3(config);
                }
            }
        ],
        exports: [
            jwt_guard_1.JwtGuard,
            newAsignacionBases_1.newAsignacionBases,
            refreshjwt_guard_1.RefreshJwtGuard,
            userjwt_model_service_1.UserjwtModelService,
        ],
        imports: [
            usuarios_module_1.UsuariosModule,
            bases_module_1.BasesModule
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map