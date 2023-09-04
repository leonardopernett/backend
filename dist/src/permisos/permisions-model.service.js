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
exports.PermisionsModelService = exports.asignarPerfilDTO = exports.permisoDTO = exports.perfilDTO = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const class_validator_1 = require("class-validator");
var CryptoJS = require("crypto-js");
class perfilDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], perfilDTO.prototype, "nombre", void 0);
exports.perfilDTO = perfilDTO;
class permisoDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], permisoDTO.prototype, "accion", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], permisoDTO.prototype, "objeto", void 0);
exports.permisoDTO = permisoDTO;
class asignarPerfilDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], asignarPerfilDTO.prototype, "perfil", void 0);
exports.asignarPerfilDTO = asignarPerfilDTO;
let PermisionsModelService = class PermisionsModelService {
    constructor(db) {
        this.db = db;
        this.crearPerfil = async (nombre) => {
            return await this.db.NIK(`CALL crear_perfil(?)`, [nombre]);
        };
        this.getPerfiles = async () => {
            return await this.db.NIK(`CALL get_perfiles()`);
        };
        this.actualizarPerfil = async (id, nuevoNombre) => {
            return await this.db.NIK(`CALL actualizar_perfil(?,?)`, [id, nuevoNombre]);
        };
        this.borrarPerfil = async (id) => {
            return await this.db.NIK(`CALL borrar_perfil(?)`, [id]);
        };
        this.asignarPermiso = async (idPerfil, permiso) => {
            return await this.db.NIK(`CALL asignar_permiso(?, ?, ?)`, [idPerfil, permiso.objeto, permiso.accion]);
        };
        this.borrarPermiso = async (idPermiso) => {
            return await this.db.NIK(`CALL borrar_permiso(?)`, [idPermiso]);
        };
        this.getPermisos = async (idPerfil) => {
            return await this.db.NIK(`CALL get_pemisos_perfil(?)`, [idPerfil]);
        };
        this.actualizarPermiso = async (idPermiso, permiso) => {
            return await this.db.NIK(`CALL actualizar_permiso(?, ?, ?)`, [idPermiso, permiso.accion, permiso.objeto]);
        };
        this.asignarPerfil = async (userId, perfilId) => {
            return await this.db.NIK(`CALL asignar_perfil(?, ?)`, [userId, perfilId]);
        };
        this.desasignarPerfil = async (userId, perfilId) => {
            return await this.db.NIK(`CALL desasignar_perfil(?, ?)`, [userId, perfilId]);
        };
        this.getUserPerfiles = async (userId) => {
            return await this.db.NIK(`CALL get_usuario_perfiles(?)`, [userId]);
        };
    }
    async getuserpermiso(cedula) {
        let data = await this.db.JARVIS(`SELECT
        a.documento,c.nombre_completo,d.usuario_red,b.tipo_estado,f.posicion
        
        FROM dp_distribucion_personal a
        
        INNER JOIN dp_estados b
        ON b.id_dp_estados = a.id_dp_estados
        
        JOIN dp_datos_generales c
        ON c.documento=a.documento
        
        LEFT JOIN dp_usuarios_red d
        ON d.documento=a.documento
        
        JOIN dp_cargos e
        ON e.id_dp_cargos=a.id_dp_cargos
        
        JOIN dp_posicion f
        ON f.id_dp_posicion=e.id_dp_posicion
        
        WHERE a.documento = ?
        AND a.fecha_actual = ( SELECT MAX(b.fecha_actual) FROM dp_distribucion_personal b WHERE b.documento = a.documento  )
        GROUP BY a.documento`, [cedula]);
        if (data.length === 1) {
            return data;
        }
        else {
            return this.db.NIK("SELECT 'NA' AS documento,a.nombre AS nombre_completo,a.documento AS usuario_red,'Gestion' AS tipo_estado,'Externo' AS posicion FROM usuario_nik a WHERE a.documento=?", [cedula]);
        }
    }
    async obteneridusuario(cedula) {
        let data = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        if (data[0].length > 0) {
            return data[0];
        }
        else {
            return 0;
        }
    }
    async permisoscategorias() {
        let data = await this.db.nikcleanPoolConection.query('SELECT * FROM permisos_categorias');
        return data[0];
    }
    async permisoscategoriasapi() {
        let data = await this.db.nikcleanPoolConection.query('SELECT * FROM permisos_categorias_api');
        return data[0];
    }
    async buscarusuarioapi(usuario) {
        let data = await this.db.nikcleanPoolConection.query('SELECT * FROM api_users WHERE usuario=?', [usuario]);
        return data[0];
    }
    async permisos(idusuario) {
        let data = await this.db.nikcleanPoolConection.query(`SELECT * FROM (SELECT
            a.id,
            a.permiso,
            a.id_categoria,
            ISNULL(b.id_permiso) AS seleccion
            
            FROM permiso a
            
            LEFT JOIN permisos_usuario b
            ON a.id=b.id_permiso
            
            WHERE id_permiso IS NOT NULL AND b.id_usuario=?
            
            
            
            UNION
            
            SELECT
            a.id,
            a.permiso,
            a.id_categoria,
            1 seleccion
            
            FROM permiso a
            
            WHERE a.id NOT IN (
            SELECT
            a.id
            
            FROM permiso a
            
            LEFT JOIN permisos_usuario b
            ON a.id=b.id_permiso
            
            WHERE id_permiso IS NOT NULL AND b.id_usuario=?
            )
            ) AS i ORDER BY id`, [idusuario, idusuario]);
        return data[0];
    }
    asignacionpermisos(idpermiso, idusuario, accion) {
        if (accion == 'save') {
            this.db.nikcleanPoolConection.query('INSERT INTO permisos_usuario (id_permiso,id_usuario) VALUES (?,?)', [idpermiso, idusuario]);
            return true;
        }
        if (accion == 'delete') {
            this.db.nikcleanPoolConection.query('DELETE FROM permisos_usuario WHERE id_permiso=? AND id_usuario=?', [idpermiso, idusuario]);
            return true;
        }
    }
    asignacionpermisosapi(idpermiso, idusuario, accion) {
        if (accion == 'save') {
            this.db.nikcleanPoolConection.query('INSERT INTO permisos_usuario_api (id_permiso_api,id_usuario_api) VALUES (?,?)', [idpermiso, idusuario]);
            return true;
        }
        if (accion == 'delete') {
            this.db.nikcleanPoolConection.query('DELETE FROM permisos_usuario_api WHERE id_permiso_api=? AND id_usuario_api=?', [idpermiso, idusuario]);
            return true;
        }
    }
    async permisos_api(iduser) {
        let data = await this.db.nikcleanPoolConection.query(`SELECT * FROM (SELECT
            a.id,
            a.descripcion,
            a.id_categoria,
            ISNULL(b.id_permiso_api) AS seleccion
            
            FROM permiso_api a
            
            LEFT JOIN permisos_usuario_api b
            ON a.id=b.id_permiso_api
            
            WHERE id_permiso_api IS NOT NULL AND b.id_usuario_api=?
            
            
            
            UNION
            
            SELECT
            a.id,
            a.descripcion,
            a.id_categoria,
            1 seleccion
            
            FROM permiso_api a
            
            WHERE a.id NOT IN (
            SELECT
            a.id
            
            FROM permiso_api a
            
            LEFT JOIN permisos_usuario_api b
            ON a.id=b.id_permiso_api
            
            WHERE id_permiso_api IS NOT NULL AND b.id_usuario_api=?
            )
            ) AS i ORDER BY id`, [iduser, iduser]);
        return data[0];
    }
    permisoasignarol(idrol, idpermiso, accion) {
        if (accion == 'save') {
            this.db.nikcleanPoolConection.query('INSERT INTO permisos_roles (id_rol,id_permiso) VALUES (?,?)', [idrol, idpermiso]);
            return true;
        }
        if (accion == 'delete') {
            this.db.nikcleanPoolConection.query('DELETE FROM permisos_roles WHERE id_permiso=? AND id_rol=?', [idpermiso, idrol]);
            return true;
        }
    }
    async getRoles(idusuario) {
        let data = await this.db.nikcleanPoolConection.query(`
        SELECT * FROM(SELECT 
            a.id,
            a.rol,
            ISNULL(b.id_usuario) AS seleccion
            FROM roles a
            JOIN usuarios_roles b ON b.id_rol=a.id
            WHERE b.id_usuario=?
            
            UNION
            
            SELECT 
            a.id,
            a.rol,
            1 seleccion
            FROM roles a
            WHERE a.id NOT IN
            (
            SELECT 
            a.id
            FROM roles a
            JOIN usuarios_roles b ON b.id_rol=a.id
            WHERE b.id_usuario=?
            ))
            AS i ORDER BY id ASC
        `, [idusuario, idusuario]);
        return data[0];
    }
    async asignarol(idusuario, idrol) {
        this.db.nikcleanPoolConection.query('DELETE FROM usuarios_roles WHERE id_usuario=?', [idusuario]).then(data => {
            this.db.nikcleanPoolConection.query('INSERT INTO usuarios_roles (id_usuario,id_rol) VALUES (?,?)', [idusuario, idrol]);
            return true;
        });
    }
    async obtenerol() {
        return this.db.nikcleanPoolConection.query('SELECT * FROM roles');
    }
    async obteneruserapi() {
        return this.db.nikcleanPoolConection.query('SELECT id,usuario,estado FROM api_users');
    }
    async crearol(rol) {
        return this.db.nikcleanPoolConection.query('INSERT INTO roles (rol,condicion) VALUES (?,1)', [rol]);
    }
    async crearusuarioapi(usuario, password, estado) {
        var ciphertext = CryptoJS.AES.encrypt(password, 'abc').toString();
        return this.db.nikcleanPoolConection.query('INSERT INTO api_users (usuario,password,estado) VALUES (?,?,?)', [usuario, ciphertext, estado]);
    }
    async editarusuarioapi(id, usuario, password, estado) {
        var ciphertext = CryptoJS.AES.encrypt(password, 'abc').toString();
        return this.db.nikcleanPoolConection.query('UPDATE api_users SET usuario = ?, password= ? , estado = ? WHERE id = ?', [usuario, ciphertext, estado, id]);
    }
    async eliminarusuarioapi(id) {
        return this.db.nikcleanPoolConection.query('DELETE FROM api_users WHERE id=?', [id]);
    }
    async editarol(rol, idrol) {
        return this.db.nikcleanPoolConection.query('UPDATE roles SET rol = ? WHERE id=?', [rol, idrol]);
    }
    async eliminarol(idrol) {
        return this.db.nikcleanPoolConection.query('DELETE FROM roles WHERE id=? AND condicion=1', [idrol]);
    }
    async obtenerpermisorol(idrol) {
        let data = await this.db.nikcleanPoolConection.query(`
        SELECT * FROM (SELECT
            a.id,
            a.permiso,
            a.id_categoria,
            ISNULL(b.id_permiso) AS seleccion
            
            FROM permiso a
            
            LEFT JOIN permisos_roles b
            ON a.id=b.id_permiso
            
            WHERE id_permiso IS NOT NULL AND b.id_rol=?
            
            
            
            UNION
            
            SELECT
            a.id,
            a.permiso,
            a.id_categoria,
            1 seleccion
            
            FROM permiso a
            
            WHERE a.id NOT IN (
            SELECT
            a.id
            
            FROM permiso a
            
            LEFT JOIN permisos_roles b
            ON a.id=b.id_permiso
            
            WHERE id_permiso IS NOT NULL AND b.id_rol=?
            )
            ) AS i ORDER BY id
        `, [idrol, idrol]);
        return data[0];
    }
};
PermisionsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], PermisionsModelService);
exports.PermisionsModelService = PermisionsModelService;
//# sourceMappingURL=permisions-model.service.js.map