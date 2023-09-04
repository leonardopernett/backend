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
exports.ReportsTableModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
let ReportsTableModelService = class ReportsTableModelService {
    constructor(db) {
        this.db = db;
    }
    guardartable(data) {
        this.db.NIK('INSERT INTO permisos_multiples_archivo (nombres, documento, url,fecha_ultima) VALUES (?,?,?,DATE_ADD(NOW(), INTERVAL -5 HOUR))', [data.user, data.documento, data.url]);
    }
    guardarpermisos(origen, destino) {
        this.db.NIK(`call agregar_permisos_multiples(?,?)`, [origen.toString(), destino.toString()]);
    }
    async borrarpermisos() {
        this.db.NIK(`TRUNCATE TABLE permisos_multiples `);
    }
    obtenerpermisos() {
        return this.db.NIK(`SELECT nombres,documento,url,DATE_ADD(fecha_ultima, INTERVAL -5 HOUR) as fecha_ultima FROM permisos_multiples_archivo ORDER BY id DESC LIMIT 1`);
    }
};
ReportsTableModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], ReportsTableModelService);
exports.ReportsTableModelService = ReportsTableModelService;
//# sourceMappingURL=reporte-tabla-model.service.js.map