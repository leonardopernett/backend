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
exports.UserNotificationsModelService = exports.userNotificationDTO = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
class userNotificationDTO {
}
exports.userNotificationDTO = userNotificationDTO;
let UserNotificationsModelService = class UserNotificationsModelService {
    constructor(db) {
        this.db = db;
        this.postUserNotification = async (notificationId, userId) => {
            await this.db.NIK('call crear_notificacion_usuario(?, ?)', [userId, notificationId]);
        };
        this.getUserNotifications = async (userId, room) => {
            return await this.db.NIK('call get_usuario_notificaciones(?, ?)', [userId, room]);
        };
        this.deleteUserNotification = async (notificationId, userId) => {
            return await this.db.NIK('call borrar_notificacion_usuario(?, ?)', [userId, notificationId]);
        };
    }
};
UserNotificationsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], UserNotificationsModelService);
exports.UserNotificationsModelService = UserNotificationsModelService;
//# sourceMappingURL=userNotifications-model.service.js.map