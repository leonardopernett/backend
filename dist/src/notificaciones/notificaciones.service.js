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
exports.NotificacionesServices = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
let NotificacionesServices = class NotificacionesServices {
    constructor(db) {
        this.db = db;
    }
    async getNotificaciones(documento, page) {
        const result = await this.db.NIK('CALL `notificaciones_get`(?)', [documento]);
        return result;
    }
    async getNotificacionesLeidas(documento, id_notificacion) {
        return await this.db.NIK('replace into notificaciones_leidas(id_user,notificaciones_id) values(?,?) ', [documento, id_notificacion]);
    }
    async getById(documento) {
        const [result] = await this.db.NIK(`SELECT * from usuario where documento = ?`, [documento]);
        return result;
    }
    async getDepuracion() {
        return await this.db.NIK('delete from notificaciones WHERE fecha_creacion < DATE_SUB(NOW(), INTERVAL 15 DAY)');
    }
    async getCreateArticle(data) {
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
        return datos;
    }
    async getUpdateArticle(data) {
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
        return datos;
    }
    async getComment(data) {
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
        return datos;
    }
    async getActive() {
        return await this.db.NIK('select * from notificaciones_verificar');
    }
    async deleteNotificaciones(id) {
        return await this.db.NIK('DELETE FROM notificaciones where articulo_id=?', [id]);
    }
};
NotificacionesServices = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], NotificacionesServices);
exports.NotificacionesServices = NotificacionesServices;
//# sourceMappingURL=notificaciones.service.js.map