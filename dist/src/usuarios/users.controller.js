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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const base_model_service_1 = require("../bases/base-model.service");
const user_model_service_1 = require("./user-model.service");
const user_decorator_1 = require("../user.decorator");
const usersesions_model_service_1 = require("./usersesions-model.service");
const userNotifications_model_service_1 = require("../web-sockets/userNotifications-model.service");
const permisions_model_service_1 = require("../permisos/permisions-model.service");
const verifytoken_guard_1 = require("../auth/verifytoken.guard");
const autorization_guard_1 = require("../jwt/autorization.guard");
let UsersController = class UsersController {
    constructor(userModel, permisionsModel, baseModel, usersesionsModel, userNotificationsModel) {
        this.userModel = userModel;
        this.permisionsModel = permisionsModel;
        this.baseModel = baseModel;
        this.usersesionsModel = usersesionsModel;
        this.userNotificationsModel = userNotificationsModel;
    }
    getSelfFavorite(user, from, size, baseId) {
        return this.userModel.getUserFavorites("1102850901", "0", from, size);
    }
    getUsers(query, pcrcId) {
        return this.userModel.searchUsers(query, pcrcId);
    }
    createUser(userDto) {
        return this.userModel.createUser(userDto.nombre, userDto.documento);
    }
    async getSingleUser(user_id) {
        return await this.userModel.getUserByDocumento(user_id);
    }
    async getSingleUser2(user_id) {
        return await this.userModel.getUserByDocumento(user_id);
    }
    async deleteSingleUser(user_id) {
        return await this.userModel.deleteUser(user_id);
    }
    async updateSingleUser(user_id, body) {
        return await this.userModel.updateUser(user_id, body.rol);
    }
    getSelfFavorites(user, from, size, baseId) {
        return this.userModel.getUserFavorites(user.sub, baseId, from, size);
    }
    getUserPcrc(idUser) {
        return this.baseModel.getUserBases(idUser);
    }
    getUserPcrc2(idUser) {
        return this.baseModel.getUserBases(idUser);
    }
    async postUserPcrc(userId, body, user) {
        return await this.baseModel.postUserBase(userId, body.pcrc, user.sub);
    }
    deleteUserPcrc(idUser, baseId, user) {
        return this.baseModel.deleteUserBase(idUser, baseId, user.sub);
    }
    postUserSesion(body, user) {
        return this.usersesionsModel.postUserSesion(user.sub, body);
    }
    updateUserSesion(id, user) {
        return this.usersesionsModel.udpateUserSesion(id);
    }
    getUserSessions(id, from, size, pcrc, user) {
        return this.usersesionsModel.getUserSesions(id);
    }
    postUserNotification(body, user) {
        return this.userNotificationsModel.postUserNotification(body.id, user.sub);
    }
    getUserNotification(pcrc, user) {
        return this.userNotificationsModel.getUserNotifications(user.sub, pcrc);
    }
    deleteUserNotification(id, user) {
        return this.userNotificationsModel.deleteUserNotification(id, user.sub);
    }
    async getUserBase(documento) {
        return await this.userModel.getUserBase(documento);
    }
};
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Get('mis/favoritos'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Query('from')),
    __param(2, common_1.Query('size')),
    __param(3, common_1.Query('pcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getSelfFavorite", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __param(1, common_1.Query('pcrcId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_service_1.createUserDTO]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSingleUser", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('permisos/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSingleUser2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteSingleUser", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_service_1.updateUserRolDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSingleUser", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('me/favorites'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Query('from')),
    __param(2, common_1.Query('size')),
    __param(3, common_1.Query('pcrc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getSelfFavorites", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':idUser/pcrc'),
    __param(0, common_1.Param('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUserPcrc", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get(':idUser/cliente'),
    __param(0, common_1.Param('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUserPcrc2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post(':userId/pcrc'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, base_model_service_1.postUserPcrcDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "postUserPcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete(':user_id/pcrc/:base_id'),
    __param(0, common_1.Param('user_id')),
    __param(1, common_1.Param('base_id')),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "deleteUserPcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('me/sesion'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usersesions_model_service_1.sesionDTO, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "postUserSesion", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put('me/sesion/:id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "updateUserSesion", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id/sesion'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query('from')),
    __param(2, common_1.Query('size')),
    __param(3, common_1.Query('pcrc')),
    __param(4, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUserSessions", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('me/notification'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userNotifications_model_service_1.userNotificationDTO, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "postUserNotification", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('me/notification'),
    __param(0, common_1.Query('pcrc')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUserNotification", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('me/notification/:id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "deleteUserNotification", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('/base/:documento'),
    __param(0, common_1.Param('documento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserBase", null);
UsersController = __decorate([
    common_1.Controller('api/users'),
    __metadata("design:paramtypes", [user_model_service_1.UserModelService,
        permisions_model_service_1.PermisionsModelService,
        base_model_service_1.BaseModelService,
        usersesions_model_service_1.UsersesionsModelService,
        userNotifications_model_service_1.UserNotificationsModelService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map