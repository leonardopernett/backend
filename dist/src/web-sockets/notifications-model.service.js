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
exports.NotificationsModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
let NotificationsModelService = class NotificationsModelService {
    constructor(db) {
        this.db = db;
    }
    async registerNotification(event, room, data) {
        let [resutl] = await this.db.NIK('CALL crear_notificacion(?,?,?)', [event, room, data]);
        return resutl;
    }
    async getNotificationsByDate(from, to, room) {
        return await this.db.NIK('CALL get_notificaciones_por_fecha(?,?,?)', [room, (new Date(from)).toJSON().slice(0, 19).replace('T', ' '), (new Date(to)).toJSON().slice(0, 19).replace('T', ' ')]);
    }
};
NotificationsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], NotificationsModelService);
exports.NotificationsModelService = NotificationsModelService;
//# sourceMappingURL=notifications-model.service.js.map