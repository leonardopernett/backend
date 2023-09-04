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
exports.LdapModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const bcrypt = require('bcrypt');
let LdapModelService = class LdapModelService {
    constructor(db) {
        this.db = db;
    }
    async insertarLdap(documento, password, nombre, correo_personal, genero_capturado, fecha_nacimiento, direccion, correo_corporativo, celular, telefono, tipo) {
        const hash = await bcrypt.hash(password, 10);
        let [data] = await this.db.nikcleanPoolConection.query(`
          INSERT INTO usuario_nik (documento,password,nombre,correo_personal,id_genero,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo_usuario) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [documento, hash, nombre, correo_personal, genero_capturado, fecha_nacimiento, direccion, correo_corporativo, celular, telefono, tipo]);
        return data;
    }
    async editarLdap(nombre, correo_personal, genero_capturado, fecha_nacimiento, direccion, correo_corporativo, celular, telefono, id, tipo, actividad) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET nombre = ?,correo_personal = ?,id_genero = ?,fecha_nacimiento = ?, direccion = ?, correo_corporativo = ?,celular = ?,telefono = ?,tipo_usuario = ?, fecha_actividad = ?
          WHERE id=?
          `, [nombre, correo_personal, genero_capturado, fecha_nacimiento, direccion, correo_corporativo, celular, telefono, tipo, actividad, id]);
        return data;
    }
    async buscarLdap(usuario) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT a.id, a.documento , a.nombre, a.correo_personal, b.genero, b.id_genero , a.fecha_nacimiento , a.direccion , a.correo_corporativo , a.bloqueo , a.celular , a.telefono
          FROM usuario_nik a
          JOIN genero b  ON a.id_genero=b.id_genero 
          WHERE documento=?`, [usuario]);
        return data;
    }
    async validarusuario(usuario) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT a.id FROM usuario a 
          WHERE a.documento=?
          UNION 
          SELECT b.id FROM usuario_nik b
          WHERE b.documento=?`, [usuario, usuario]);
        return data;
    }
    async generoLdap() {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT * FROM genero`);
        return data;
    }
    async tipoLdap() {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT * FROM tipo_usuario`);
        return data;
    }
    async mostrarLdap() {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT a.id, a.documento , a.nombre, a.correo_personal, b.genero , b.id_genero, a.fecha_nacimiento , a.direccion , a.correo_corporativo , a.bloqueo  , a.celular , a.telefono , a.tipo_usuario, DATE_ADD(a.fecha_actividad, INTERVAL c.fecha_bloqueo DAY) AS fecha_expiracion, a.fecha_actividad
          FROM usuario_nik a
          JOIN genero b  ON a.id_genero=b.id_genero
          JOIN tipo_usuario c ON c.id=a.tipo_usuario 
          ORDER BY id DESC 
          LIMIT 10`);
        return data;
    }
    async eliminarLdap(usuario, documento) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          DELETE FROM usuario_nik WHERE id=?`, [usuario]);
        await this.db.nikcleanPoolConection.query(`
          DELETE FROM usuario WHERE documento=?`, [documento]);
        return data;
    }
    async desbloquearusuario(id, desbloquearnew) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET bloqueo = ?
          WHERE id=?
          `, [desbloquearnew, id]);
        return data;
    }
    async ingreso(id) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT a.id FROM usuario_nik a 
          WHERE a.documento=?
          `, [id]);
        return data;
    }
    async primeringreso(id) {
        let [data] = await this.db.nikcleanPoolConection.query(`
          SELECT a.primer_ingreso FROM usuario_nik a 
          WHERE a.documento=?
          `, [id]);
        return data;
    }
    async cambiarpassword(id, nuevopassword) {
        const hash = await bcrypt.hash(nuevopassword, 10);
        let [data] = await this.db.nikcleanPoolConection.query(`
          UPDATE usuario_nik
          SET password = ?,
          primer_ingreso=0
          WHERE documento=?
          `, [hash, id]);
        return data;
    }
};
LdapModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], LdapModelService);
exports.LdapModelService = LdapModelService;
//# sourceMappingURL=ldap.service.js.map