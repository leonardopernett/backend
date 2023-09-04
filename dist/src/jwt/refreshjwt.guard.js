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
exports.RefreshJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const userjwt_model_service_1 = require("./userjwt-model.service");
let RefreshJwtGuard = class RefreshJwtGuard {
    constructor(userjwtModel) {
        this.userjwtModel = userjwtModel;
    }
    canActivate(context) {
        let validator = async () => {
            if (process.env.NODE_ENV == 'production') {
                let ctx = context.switchToHttp();
                let req = ctx.getRequest();
                let token = req.cookies.refresh_token;
                if (!!!token) {
                    return false;
                }
                try {
                    var tokenPayLoad = this.userjwtModel.validateRefreshJwt(token);
                }
                catch (err) {
                    return false;
                }
                req.user = {
                    "sub": tokenPayLoad.sub,
                    "name": tokenPayLoad.name,
                    "rol": tokenPayLoad.rol,
                    "permiso": tokenPayLoad.permiso
                };
                let tokens = await this.userjwtModel.getJWT(tokenPayLoad.sub);
                if (tokens.length == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                let ctx = context.switchToHttp();
                let req = ctx.getRequest();
                req.user = { name: "julian andres vargas", sub: "1036673423", rol: 'admin' };
                let tokens = await this.userjwtModel.getJWT("1036673423");
                if (tokens.length == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
        return validator();
    }
};
RefreshJwtGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [userjwt_model_service_1.UserjwtModelService])
], RefreshJwtGuard);
exports.RefreshJwtGuard = RefreshJwtGuard;
//# sourceMappingURL=refreshjwt.guard.js.map