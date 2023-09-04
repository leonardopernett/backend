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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const userjwt_model_service_1 = require("../jwt/userjwt-model.service");
const refreshjwt_guard_1 = require("../jwt/refreshjwt.guard");
const jwt_guard_1 = require("../jwt/jwt.guard");
const activeDiretory_guard_1 = require("./activeDiretory.guard");
const newAsignacionBases_1 = require("./newAsignacionBases");
class user {
}
let AuthController = class AuthController {
    constructor(userjwtModel, Asignacion) {
        this.userjwtModel = userjwtModel;
        this.Asignacion = Asignacion;
    }
    async login(req, res) {
        this.Asignacion.AsignarPermisoAutomatizado(req.user.sub);
        this.Asignacion.AsignarOrigenUsuario(req.user.sub);
        this.Asignacion.borrarpermisosusuario(req.user.sub);
        this.Asignacion.AsignacionBases(req.user.sub);
        this.Asignacion.AsignacionBaseNik(req.user.sub);
        if (process.env.NODE_ENV == 'production') {
            let tokens = {
                token: this.userjwtModel.generateJwt(req.user),
                refreshToken: this.userjwtModel.generateRefresh_token(req.user)
            };
            let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken);
            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                expires: new Date(decodedRefresh.exp * 1000)
            });
            await this.userjwtModel.borrarJWT(req.user.sub);
            await this.userjwtModel.crearJWT(req.user.sub);
            res.send(tokens);
        }
        else {
            let tokens = {
                token: this.userjwtModel.generateJwt({ name: "julian andres vargas", sub: "1036673423", rol: 'admin' }),
                refreshToken: this.userjwtModel.generateRefresh_token({ name: "julian andres vargas", sub: "1036673423", rol: 'admin' })
            };
            let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken);
            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                expires: new Date(decodedRefresh.exp * 1000)
            });
            await this.userjwtModel.borrarJWT("1036673423");
            await this.userjwtModel.crearJWT("1036673423");
            res.send(tokens);
        }
    }
    async logOut(req, res) {
        res.clearCookie('refresh_token', {
            httpOnly: true,
        });
        await this.userjwtModel.borrarJWT(req.user.sub);
        res.send({ status: 'logout' });
    }
    refreshToken(req, res) {
        var tokens = {
            token: this.userjwtModel.generateJwt(req.user),
            refreshToken: this.userjwtModel.generateRefresh_token(req.user)
        };
        let decodedRefresh = this.userjwtModel.decodeToken(tokens.refreshToken);
        res.clearCookie('refresh_token', {
            httpOnly: true,
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            expires: new Date(decodedRefresh.exp * 1000)
        });
        res.send(tokens);
    }
    currentUser(req) {
        return req.user;
    }
};
__decorate([
    common_1.UseGuards(activeDiretory_guard_1.ActiveDirectoryGuard),
    common_1.Post('authenticate'),
    common_1.HttpCode(200),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('log_out'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    common_1.UseGuards(refreshjwt_guard_1.RefreshJwtGuard),
    common_1.Get('refresh_token'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('me'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "currentUser", null);
AuthController = __decorate([
    common_1.Controller('api/auth'),
    __metadata("design:paramtypes", [userjwt_model_service_1.UserjwtModelService,
        newAsignacionBases_1.newAsignacionBases])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map