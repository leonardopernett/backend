"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConectarGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const user_model_service_1 = require("../usuarios/user-model.service");
let ConectarGateway = class ConectarGateway {
    constructor(userModel) {
        this.userModel = userModel;
        this.users = 0;
    }
    async handleConnection() {
        this.users++;
        this.estado = 'Conectado';
    }
    async handleDisconnect() {
        this.users--;
        this.estado = 'Desconectado';
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ConectarGateway.prototype, "server", void 0);
ConectarGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [user_model_service_1.UserModelService])
], ConectarGateway);
exports.ConectarGateway = ConectarGateway;
//# sourceMappingURL=conectar.gateway.js.map