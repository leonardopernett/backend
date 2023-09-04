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
exports.UserjwtModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const jwt = require("jsonwebtoken");
let UserjwtModelService = class UserjwtModelService {
    constructor(db) {
        this.db = db;
        this.crearJWT = async (userId) => {
            return await this.db.NIK(`CALL crear_jwt(?)`, [userId]);
        };
        this.borrarJWT = async (userId) => {
            return await this.db.NIK(`CALL borrar_jwt(?)`, [userId]);
        };
        this.getJWT = async (userId) => {
            return await this.db.NIK(`CALL get_jwt(?)`, [userId]);
        };
    }
    generateJwt(user) {
        return jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '5m'
        });
    }
    generateRefresh_token(user) {
        return jwt.sign(user, process.env.REFRESH_JWT_PRIVATE_KEY, {
            expiresIn: '10h'
        });
    }
    validateJwt(token) {
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    }
    validateRefreshJwt(token) {
        return jwt.verify(token, process.env.REFRESH_JWT_PRIVATE_KEY);
    }
    decodeToken(token) {
        let tokens = jwt.decode(token);
        return tokens;
    }
};
UserjwtModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], UserjwtModelService);
exports.UserjwtModelService = UserjwtModelService;
//# sourceMappingURL=userjwt-model.service.js.map