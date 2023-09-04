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
exports.ResetModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let ResetModelService = class ResetModelService {
    constructor(db) {
        this.db = db;
    }
    async generarToken(email) {
        const payload = {
            email: email
        };
        const secretKey = 'AK$IA$VQG45YG2R.X45.A24T$FRK4BG5B';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        const transporte = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'leonardo.pernett@konecta-group.com',
                pass: 'goksgqyjtdcsrcik'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        await transporte.sendMail({
            from: '"Fred Foo 👻" <support_nik@grupokonecta.com>',
            to: email,
            subject: "Restablecimiento de contraseña",
            text: "Hello world?",
            html: `
           <!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Document</title>
           </head>
           <body>
             
             <h4>restablecer password</h4>
             <p>  </p>
             <a href="https://localhost:4200/#/reset?token=${token}">restablecer</a>
           </body>
           </html>
           
           `,
        });
    }
    validartoken(token) {
        const secretKey = 'AK$IA$VQG45YG2R.X45.A24T$FRK4BG5B';
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        }
        catch (error) {
            return 0;
        }
    }
    async resetPassword(email, nuevopassword) {
        const hash = await bcrypt.hash(nuevopassword, 10);
        let [data] = await this.db.nikcleanPoolConection.query(`
        UPDATE usuario_nik
        SET password = ?
        WHERE correo_personal=? OR correo_corporativo=?
        `, [hash, email, email]);
        return data;
    }
};
ResetModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], ResetModelService);
exports.ResetModelService = ResetModelService;
//# sourceMappingURL=reset.service.js.map