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
exports.ActiveDirectoryGuard = void 0;
const common_1 = require("@nestjs/common");
const user_model_service_1 = require("../usuarios/user-model.service");
const db_service_1 = require("../databases/db.service");
const base_model_service_1 = require("../bases/base-model.service");
const asignacionBases_1 = require("./asignacionBases");
const async_1 = require("async");
const bcrypt = require('bcrypt');
let ActiveDirectoryGuard = class ActiveDirectoryGuard {
    constructor(userModel, db, baseModel) {
        this.userModel = userModel;
        this.db = db;
        this.baseModel = baseModel;
    }
    canActivate(context) {
        let validator = async () => {
            let persona;
            let user;
            let usernameF;
            let ldap = false;
            let ctx = context.switchToHttp();
            let req = ctx.getRequest();
            usernameF = `${req.body.username}*`;
            try {
                throw new Error("1");
            }
            catch (error) {
                try {
                    throw new Error("1");
                }
                catch (error) {
                    try {
                        throw new Error("2");
                    }
                    catch (error) {
                        let [bloqueo] = await this.db.nikcleanPoolConection.query("SELECT bloqueo FROM usuario_nik WHERE documento=?", [req.body.username]);
                        if (bloqueo[0].bloqueo == 3) {
                            throw new common_1.HttpException({
                                "message": "Usuario o Contraseña Incorrecta"
                            }, 401);
                        }
                        else {
                            [user] = await this.db.nikcleanPoolConection.query("SELECT password FROM usuario_nik WHERE documento=?", [req.body.username]);
                            const result = await bcrypt.compare(req.body.password, user[0].password);
                            if (result == false) {
                                this.db.nikcleanPoolConection.query(`UPDATE usuario_nik
                SET bloqueo = 1+bloqueo
                WHERE documento=?`, [req.body.username]);
                                throw new common_1.HttpException({
                                    "message": "Usuario o Contraseña Incorrecta"
                                }, 401);
                            }
                            else {
                                ldap = true;
                            }
                        }
                    }
                }
            }
            if (ldap) {
                if (user[0].length != 0) {
                    let usernik = await this.db.nikcleanPoolConection.query("SELECT documento,nombre FROM usuario_nik WHERE documento=?", [req.body.username]);
                    if (usernik[0][0] != 0) {
                        persona = {
                            "postOfficeBox": usernik[0][0].documento,
                            "cn": usernik[0][0].nombre
                        };
                    }
                }
            }
            let permisosA = [];
            let permisosD = [];
            var [userfind] = await this.db.NIK('call get_usuario_by_documento(?)', [persona.postOfficeBox]);
            if (!userfind) {
                var newuser = await this.userModel.createUser(persona.cn, persona.postOfficeBox);
                await this.db.nikcleanPoolConection.query(`REPLACE INTO usuarios_roles
        (
            id_usuario,
            id_rol
        )
        VALUES
        (?, ?)`, [newuser.id, 3]);
                let userBases = await this.baseModel.getUserBases(newuser.documento);
                if (userBases.length) {
                    let ids_pcrc = userBases.map(cliente => {
                        return cliente.pcrcs.map(pcrc => pcrc.id_dp_pcrc);
                    }).reduce((acc, curr) => {
                        return [...acc, ...curr];
                    }, []);
                    let asignacionesParaAgregar = asignacionBases_1.asignaciones.filter(asignacion => ids_pcrc.includes(parseInt(asignacion.baseOrigen)));
                    await async_1.map(asignacionesParaAgregar, async (asignacion) => {
                        try {
                            return await this.baseModel.postUserBase(newuser.documento, asignacion.acceso, '');
                        }
                        catch (error) {
                        }
                    });
                }
                var [userfindDefault] = await this.db.NIK('call get_usuario_by_documento(?)', [newuser.documento]);
                let permisosRolDefecto = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_roles WHERE permisos_roles.id_rol=?', [userfindDefault.id_rol]);
                let permisosDefecto = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_usuario WHERE permisos_usuario.id_usuario=?', userfindDefault.id);
                permisosDefecto[0].forEach(element => {
                    permisosD.push(element.id_permiso);
                });
                permisosRolDefecto[0].forEach(element => {
                    if (permisosD.indexOf(element.id_permiso) == -1) {
                        permisosD.push(element.id_permiso);
                    }
                });
                req.user = {
                    sub: newuser.documento,
                    name: persona.cn,
                    rol: userfindDefault.rol,
                    permiso: permisosD
                };
            }
            else {
                let permisosRol = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_roles WHERE permisos_roles.id_rol=?', [userfind.id_rol]);
                let permisos = await this.db.nikcleanPoolConection.query('SELECT id_permiso FROM permisos_usuario WHERE permisos_usuario.id_usuario=?', userfind.id);
                permisos[0].forEach(element => {
                    permisosA.push(element.id_permiso);
                });
                permisosRol[0].forEach(element => {
                    if (permisosA.indexOf(element.id_permiso) == -1) {
                        permisosA.push(element.id_permiso);
                    }
                });
                req.user = {
                    sub: userfind.documento,
                    name: persona.cn,
                    rol: userfind.rol,
                    permiso: permisosA
                };
            }
            return true;
        };
        return validator();
    }
};
ActiveDirectoryGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_model_service_1.UserModelService,
        db_service_1.DbService,
        base_model_service_1.BaseModelService])
], ActiveDirectoryGuard);
exports.ActiveDirectoryGuard = ActiveDirectoryGuard;
//# sourceMappingURL=activeDiretory.guard.js.map