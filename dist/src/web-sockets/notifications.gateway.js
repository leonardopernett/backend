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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const notifications_model_service_1 = require("./notifications-model.service");
const usersesions_model_service_1 = require("../usuarios/usersesions-model.service");
const R = require("remeda");
let NotificationsGateway = class NotificationsGateway {
    constructor(notificationsModel, usersesionsModel) {
        this.notificationsModel = notificationsModel;
        this.usersesionsModel = usersesionsModel;
    }
    afterInit(server) {
    }
    async handleConnection(socket, ...args) {
    }
    handleDisconnect(client) {
    }
    async subcribeToRoom(data, socket) {
        let rooms = Object.keys(socket.rooms);
        if (rooms.length > 1) {
            socket.leave(rooms[0]);
            socket.leave(rooms[0] + '/' + socket.handshake.query.cedula);
        }
        socket.join(data);
        socket.join(data + '/' + socket.handshake.query.cedula);
        socket.join(socket.handshake.query.cedula);
        let [lastConnection] = await this.usersesionsModel.getUserSesions(socket.handshake.query.cedula);
        if (lastConnection) {
            let result = await Promise.all([
                this.notificationsModel.getNotificationsByDate(parseInt(lastConnection.logout), (new Date()).getTime(), data),
                this.notificationsModel.getNotificationsByDate(parseInt(lastConnection.logout), (new Date()).getTime(), data + '/' + socket.handshake.query.cedula)
            ]);
            return R.flatten(result);
        }
        else {
            return [];
        }
    }
    async newArticle(data, socket) {
        let rooms = Object.keys(socket.rooms);
        let notificationRegister = await this.notificationsModel.registerNotification('newarticle', rooms[0], data);
        if (rooms.length > 1) {
            socket.in(rooms[0]).emit('newarticle', notificationRegister);
        }
    }
    async articleUpdate(data, socket) {
        let rooms = Object.keys(socket.rooms);
        let notificationRegister = await this.notificationsModel.registerNotification('articleUpdate', rooms[0], data);
        if (rooms.length > 1) {
            socket.in(rooms[0]).emit('articleUpdate', notificationRegister);
        }
    }
    async nuevanoticia(data, socket) {
        let rooms = Object.keys(socket.rooms);
        let notificationRegister = await this.notificationsModel.registerNotification('nuevanoticia', rooms[0], data);
        if (rooms.length > 1) {
            socket.in(rooms[0]).emit('nuevanoticia', notificationRegister);
        }
    }
    async newComment(data, socket) {
        let rooms = Object.keys(socket.rooms);
        let notificationRegister = await this.notificationsModel.registerNotification('newComment', rooms[0] + '/' + socket.handshake.query.cedula, data);
        if (rooms.length > 1) {
            socket.in(rooms[0] + '/' + socket.handshake.query.cedula).emit('newComment', notificationRegister);
        }
    }
};
__decorate([
    websockets_1.SubscribeMessage('subcribe'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "subcribeToRoom", null);
__decorate([
    websockets_1.SubscribeMessage('newarticle'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "newArticle", null);
__decorate([
    websockets_1.SubscribeMessage('articleUpdate'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "articleUpdate", null);
__decorate([
    websockets_1.SubscribeMessage('nuevanoticia'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "nuevanoticia", null);
__decorate([
    websockets_1.SubscribeMessage('newComment'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "newComment", null);
NotificationsGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: 'articles' }),
    __metadata("design:paramtypes", [notifications_model_service_1.NotificationsModelService,
        usersesions_model_service_1.UsersesionsModelService])
], NotificationsGateway);
exports.NotificationsGateway = NotificationsGateway;
//# sourceMappingURL=notifications.gateway.js.map