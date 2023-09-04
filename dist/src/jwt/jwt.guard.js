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
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const userjwt_model_service_1 = require("./userjwt-model.service");
let JwtGuard = class JwtGuard {
    constructor(userjwtModel) {
        this.userjwtModel = userjwtModel;
    }
    canActivate(context) {
        let validator = async () => {
            let ctx = context.switchToHttp();
            let req = ctx.getRequest();
            if (!!!req.headers.authorization) {
                return false;
            }
            if (!req.headers.authorization.startsWith('Bearer ')) {
                return false;
            }
            if (req.headers.authorization.split('Bearer ').length < 2) {
                return false;
            }
            let token = req.headers.authorization.split('Bearer ')[1];
            try {
                var tokenPayLoad = this.userjwtModel.validateJwt(token);
            }
            catch (error) {
                return false;
            }
            req.user = {
                "sub": tokenPayLoad.sub,
                "name": tokenPayLoad.name,
                "rol": tokenPayLoad.rol
            };
            let tokens = await this.userjwtModel.getJWT(tokenPayLoad.sub);
            if (tokens == undefined) {
                return false;
            }
            if (tokens.length == 0) {
                return false;
            }
            else {
                return true;
            }
        };
        return validator();
    }
};
JwtGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [userjwt_model_service_1.UserjwtModelService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map