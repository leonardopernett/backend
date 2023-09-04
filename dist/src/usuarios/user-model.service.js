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
exports.UserModelService = exports.createUserDTO = exports.deleteUserDTO = exports.updateUserRolDTO = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const db_service_1 = require("../databases/db.service");
const base_model_service_1 = require("../bases/base-model.service");
class updateUserRolDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "Debes proporcionar un rol" }),
    class_validator_1.IsIn(['admin', 'publicador', 'user'], { message: "el rol debe ser 'admin','publicador' ó 'user' " }),
    __metadata("design:type", String)
], updateUserRolDTO.prototype, "rol", void 0);
exports.updateUserRolDTO = updateUserRolDTO;
class deleteUserDTO {
}
exports.deleteUserDTO = deleteUserDTO;
class createUserDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], createUserDTO.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], createUserDTO.prototype, "documento", void 0);
exports.createUserDTO = createUserDTO;
let UserModelService = class UserModelService {
    constructor(db, baseModel) {
        this.db = db;
        this.baseModel = baseModel;
        this.searchUsers = async (query, baseId) => {
            if (typeof baseId == 'undefined' || baseId == null) {
                let result = await this.db.JARVIS(`
                select
                a.documento as cedula,
                replace(concat(a.primer_nombre , ' ' , a.segundo_nombre , ' ' , a.primer_apellido, ' ' , a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where replace(concat(a.primer_nombre , ' ' , a.segundo_nombre , ' ' , a.primer_apellido, ' ' , a.segundo_apellido),'  ',' ') like ('%${query}%')
                or a.documento like ('%${query}%')
            `);
                if (result.length == 0) {
                    let result = await this.db.NIK(`
                select
                a.documento as cedula,
                a.nombre
                from usuario_nik a
                where a.documento=?
            `, [query]);
                    return result;
                }
                else {
                    return result;
                }
            }
            else {
                let result = await this.db.JARVIS(`
                select 
                replace(concat(c.primer_nombre , ' ' , c.segundo_nombre , ' ' , c.primer_apellido, ' ' , c.segundo_apellido),'  ',' ') as nombre,
                c.documento as cedula
                from dp_datos_generales c
                inner join dp_distribucion_personal a
                on c.documento = a.documento
                inner join dp_pcrc b
                on a.cod_pcrc = b.cod_pcrc
                where a.fecha_actual = DATE_FORMAT( now(), concat('%Y-%m','-01'))
                and b.id_dp_pcrc = '${baseId}'
                and (
                replace(concat(c.primer_nombre , ' ' , c.segundo_nombre , ' ' , c.primer_apellido, ' ' , c.segundo_apellido),'  ',' ') like ('%${query}%')
                    or 
                c.documento like ('%${query}%')
                )
            `);
                return result;
            }
        };
        this.updateUser = async (userId, newRol) => {
            let [[nikUser], [jarvisUser]] = await Promise.all([
                this.db.NIK('call get_usuario_by_documento(?)', [userId]),
                this.db.JARVIS(`
                select
                    replace(concat(a.primer_nombre, ' ', a.segundo_nombre, ' ', a.primer_apellido, ' ', a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where a.documento = ?
            `, [userId])
            ]);
            if (nikUser) {
                await this.db.NIK('call actualizar_usuario_rol(?,?)', [userId, newRol]);
            }
            else {
                await this.createUser(jarvisUser.nombre, userId);
                await this.db.NIK('call actualizar_usuario_rol(?,?)', [userId, newRol]);
            }
        };
    }
    async createUser(nombre, documento) {
        let result = await this.db.NIK(`call crear_usuario(?,?)`, [nombre, documento]);
        return result[0];
    }
    async getUserByUserName(userName) {
        let result = await this.db.NIK('call get_usuario_by_username(?)', [userName]);
        return result[0];
    }
    async getUserByDocumento(userId) {
        let [[nikUser], [jarvisUser]] = await Promise.all([
            this.db.NIK('call get_usuario_by_documento(?)', [userId]),
            this.db.JARVIS(`
                select
                    replace(concat(a.primer_nombre, ' ', a.segundo_nombre, ' ', a.primer_apellido, ' ', a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where a.documento = ?
            `, [userId])
        ]);
        let userBases = (await (this.baseModel.getUserBases(userId)))
            .map(base => base.pcrcs)
            .reduce((prev, curr) => {
            return [...prev, ...curr];
        }, [])
            .map(base => base.id_dp_pcrc);
        if (nikUser) {
            return {
                cedula: userId,
                nombre: nikUser.user_name,
                rol: nikUser.rol,
                pcrc: userBases,
            };
        }
        else {
            return {
                cedula: userId,
                nombre: jarvisUser.nombre,
                rol: 'user',
                pcrc: userBases
            };
        }
    }
    async deleteUser(userId) {
        return await this.db.NIK('call borrar_usario(?)', [userId]);
    }
    async getUserFavorites(userId, baseId, from, size) {
        return await this.db.NIK('CALL get_user_favoritos(?, ?, ?, ?)', [userId, baseId, from, size]);
    }
    async getUserByUserBases(Cedula) {
        let result = await this.db.NIK('call get_usuario_by_userandbases(?)', [Cedula]);
        return result[0];
    }
    async getUserBase(documento) {
        return await this.db.NIK('select * from usuario_base where documento = ? ', [documento]);
    }
};
UserModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService,
        base_model_service_1.BaseModelService])
], UserModelService);
exports.UserModelService = UserModelService;
//# sourceMappingURL=user-model.service.js.map