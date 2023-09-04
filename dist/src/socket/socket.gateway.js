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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const db_service_1 = require("../databases/db.service");
let SocketGateway = class SocketGateway {
    constructor(db) {
        this.db = db;
    }
    handleMessage(message) {
        this.socket.emit('message', message);
    }
    async handleArticuloSave(client, data) {
        const res = await this.db.NIK('select categoria.base_id from categoria where categoria.id = ?', [data.category]);
        const newData = { ...data, base_id: res[0].base_id };
        const { title, creator, base_id } = newData;
        const user = await this.db.NIK('select id from usuario where documento = ?', [creator]);
        const notificacion_id = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [
            user[0].id,
            title,
            1,
            data.id
        ]);
        await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ', [base_id, notificacion_id[0].id]);
        const respuesta = await this.db.NIK('call notificaciones_get(?)', [creator]);
        const datos = respuesta[0];
        return client.broadcast.emit('responsearticulosave', datos);
    }
    async handleArticuloEdit(client, data) {
        const article = await this.db.NIK('select * from articulo where id=?', [data.id]);
        const { title, base_id } = article[0];
        const user = await this.db.NIK('select id from usuario where documento = ?', [data.creator]);
        const notificacion_id = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [
            user[0].id,
            title,
            2,
            data.id
        ]);
        await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ', [base_id, notificacion_id[0].id]);
        const respuesta = await this.db.NIK('call notificaciones_get(?)', [data.creator]);
        const datos = respuesta[0];
        client.broadcast.emit('responsearticuloedit', datos);
    }
    async handleComentarionRespuesta(client, data) {
        const article = await this.db.NIK('select * from articulo where id=?', [data.id]);
        const { base_id } = article[0];
        const user = await this.db.NIK('select id from usuario where documento = ?', [data.creator]);
        const notificacion_id = await this.db.NIK('call notificaciones_get_id(?,?,?,?)', [
            user[0].id,
            data.title,
            4,
            data.id
        ]);
        await this.db.NIK('insert into notificaciones_base (base_id, notificaciones_id) values(?,?) ', [base_id, notificacion_id[0].id]);
        const respuesta = await this.db.NIK('call notificaciones_get(?)', [data.creator]);
        const datos = respuesta[0];
        client.broadcast.emit('respuestacomentario', datos);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], SocketGateway.prototype, "socket", void 0);
__decorate([
    websockets_1.SubscribeMessage('event'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('articulosave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleArticuloSave", null);
__decorate([
    websockets_1.SubscribeMessage('articuloedit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleArticuloEdit", null);
__decorate([
    websockets_1.SubscribeMessage('comentario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleComentarionRespuesta", null);
SocketGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map