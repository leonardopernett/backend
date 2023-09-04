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
exports.UsuarioExternoService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const jsonwebtoken_1 = require("jsonwebtoken");
const db_service_1 = require("../databases/db.service");
let UsuarioExternoService = class UsuarioExternoService {
    constructor(db) {
        this.db = db;
    }
    generateToke(email) {
        return jsonwebtoken_1.sign({ email: email }, 'secretkey', { expiresIn: '1h' });
    }
    sendmail(data) {
        const trasporte = nodemailer_1.createTransport({
            host: '172.102.100.31',
            port: 25,
            secure: false,
            auth: false,
            tls: {
                rejectUnauthorized: false
            }
        });
        try {
            data.forEach(async (item) => {
                let mailOptions = {
                    from: 'gestoresdelaprendizaje@grupokonecta.com',
                    to: item.value,
                    subject: 'Inscripcion',
                    text: `http://localhost:4200/#/register/${this.generateToke(item.value)}`,
                    html: `
                <h2>Acceder Url Para Registro</h2>
                <p>http://localhost:4200/#/register/${this.generateToke(item.value)}</p>
                
                 
                `
                };
                await trasporte.sendMail(mailOptions);
                return { mensaje: "Enviados" };
            });
        }
        catch (error) {
            console.log(error);
        }
        return;
    }
    async getuser() {
        let result = await this.db.NIK(`CALL get_user_externos`);
        return result;
    }
    async createuser(data) {
        let result = await this.db.NIK(`call crear_usuario_externo(?,?,?,?,?)`, [data.documento, data.nombres, data.apellidos, data.correo, data.password]);
        return { mensaje: "Usuario Creado Exitosamente" };
    }
    async deleteuser(id) {
        let result = await this.db.NIK(`call eliminar_usuario_externo(?)`, [id]);
        return { mensaje: "Usuario Eliminado Exitosamente" };
    }
};
UsuarioExternoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], UsuarioExternoService);
exports.UsuarioExternoService = UsuarioExternoService;
//# sourceMappingURL=usuario-externo.service.js.map