"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const user_model_service_1 = require("./user-model.service");
const usersesions_model_service_1 = require("./usersesions-model.service");
const permisos_module_1 = require("../permisos/permisos.module");
const bases_module_1 = require("../bases/bases.module");
const web_sockets_module_1 = require("../web-sockets/web-sockets.module");
let UsuariosModule = class UsuariosModule {
};
UsuariosModule = __decorate([
    common_1.Module({
        controllers: [
            users_controller_1.UsersController
        ],
        providers: [
            user_model_service_1.UserModelService,
            usersesions_model_service_1.UsersesionsModelService
        ],
        exports: [
            user_model_service_1.UserModelService,
            usersesions_model_service_1.UsersesionsModelService
        ],
        imports: [
            permisos_module_1.PermisosModule,
            bases_module_1.BasesModule,
            common_1.forwardRef(() => web_sockets_module_1.WebSocketsModule)
        ]
    })
], UsuariosModule);
exports.UsuariosModule = UsuariosModule;
//# sourceMappingURL=usuarios.module.js.map