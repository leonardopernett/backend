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
exports.UsersesionsModelService = exports.updateSesionDTO = exports.sesionDTO = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
class sesionDTO {
}
exports.sesionDTO = sesionDTO;
class updateSesionDTO {
}
exports.updateSesionDTO = updateSesionDTO;
let UsersesionsModelService = class UsersesionsModelService {
    constructor(db) {
        this.db = db;
        this.postUserSesion = async (userid, sesionData) => {
            let [result] = await this.db.NIK('CALL crear_sesion(?, ?)', [userid, sesionData.pcrc]);
            return result;
        };
        this.udpateUserSesion = async (id) => {
            return await this.db.NIK('CALL finalizar_sesion(?)', [id]);
        };
        this.getUserSesions = async (userId) => {
            return await this.db.NIK('CALL get_sesiones_usuario(?)', [userId]);
        };
    }
};
UsersesionsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], UsersesionsModelService);
exports.UsersesionsModelService = UsersesionsModelService;
//# sourceMappingURL=usersesions-model.service.js.map