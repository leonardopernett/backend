"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketsModule = void 0;
const common_1 = require("@nestjs/common");
const notifications_model_service_1 = require("./notifications-model.service");
const notifications_gateway_1 = require("./notifications.gateway");
const userNotifications_model_service_1 = require("./userNotifications-model.service");
const usuarios_module_1 = require("../usuarios/usuarios.module");
let WebSocketsModule = class WebSocketsModule {
};
WebSocketsModule = __decorate([
    common_1.Module({
        controllers: [],
        providers: [
            notifications_model_service_1.NotificationsModelService,
            notifications_gateway_1.NotificationsGateway,
            userNotifications_model_service_1.UserNotificationsModelService
        ],
        exports: [
            notifications_model_service_1.NotificationsModelService,
            notifications_gateway_1.NotificationsGateway,
            userNotifications_model_service_1.UserNotificationsModelService
        ],
        imports: [
            common_1.forwardRef(() => usuarios_module_1.UsuariosModule)
        ]
    })
], WebSocketsModule);
exports.WebSocketsModule = WebSocketsModule;
//# sourceMappingURL=web-sockets.module.js.map