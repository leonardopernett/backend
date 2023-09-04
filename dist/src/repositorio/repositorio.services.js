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
exports.RepositorioServices = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
let RepositorioServices = class RepositorioServices {
    constructor(db) {
        this.db = db;
    }
    async saveReposit(file) {
        let comentario = await this.db.NIK('CALL agregar_documento(?,?,?,?,?,?,?)', [
            file.nombre_archivo, file.extension, file.peso, file.documento_creador, file.s3_name, file.id_articulo, file.url
        ]);
        return comentario;
    }
    async getRePositoryId(id) {
        return await this.db.NIK('CALL get_documentos(?)', [id]);
    }
    async deleteBorrador(id, user) {
        return await this.db.NIK('CALL eliminar_documento(?,?)', [user, id]);
    }
};
RepositorioServices = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], RepositorioServices);
exports.RepositorioServices = RepositorioServices;
//# sourceMappingURL=repositorio.services.js.map