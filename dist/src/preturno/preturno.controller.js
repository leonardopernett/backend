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
exports.PreturnoController = void 0;
const common_1 = require("@nestjs/common");
const preturno_model_service_1 = require("../preturno/preturno-model.service");
const jwt_guard_1 = require("../jwt/jwt.guard");
let PreturnoController = class PreturnoController {
    constructor(Preturno) {
        this.Preturno = Preturno;
    }
    async insertarPreturno(body) {
        return await this.Preturno.insertarpreturno(body);
    }
    async mostrarPreturnos(body) {
        return await this.Preturno.mostrarpreturnos(body.pcrc);
    }
    async mostrarPreturnosAcargo(body) {
        return await this.Preturno.mostrarpreturnosacargo(body.cedula);
    }
    async mostrarPreturnosadmin(body) {
        return await this.Preturno.mostrarpreturnosadmin(body.cedula);
    }
    async borrarPreturnos(body) {
        return await this.Preturno.borrarpreturno(body.idpreturno);
    }
    async actualizarPreturnos(body) {
        return await this.Preturno.actualizarpreturno(body.idpreturno, body.titulo, body.descripcion, body.contenido, body.fecha_inicial, body.fecha_final);
    }
    guardarPreguntas(body) {
        return this.Preturno.guardarPreguntas(body.idpreturno, body.preguntas, body.respuestas);
    }
    guardarConcepto(body) {
        return this.Preturno.guardarConcepto(body.idpreturno, body.preguntas, body.respuestas);
    }
    validarTotal(body) {
        return this.Preturno.validarPreturnoTotal(body.idpcrc, body.cedula);
    }
    TotalCargo(body) {
        return this.Preturno.totalcargo(body.cedula);
    }
    aprobacion(body) {
        return this.Preturno.aprobacion(body.cedula);
    }
    getObligatorioPreguntas(body) {
        return this.Preturno.obtenerPreguntasPreturno(body.id_preturno);
    }
    getObligatorioPreguntasUnica(body) {
        return this.Preturno.obtenerPreguntasPreturnoUnica(body.id_preturno);
    }
    getObligatorioPreguntasConcepto(body) {
        return this.Preturno.obtenerPreguntasPreturnoConcepto(body.id_preturno);
    }
    getObligatorioRespuestasConcepto(body) {
        return this.Preturno.obtenerRespuestaPreturnoConcepto(body.id_pregunta);
    }
    guardarCuestionarioUnico(body) {
        return this.Preturno.guardarCuestionarioUnico(body.id_preturno, body.cedula);
    }
    guardarCuestionarioConcepto(body) {
        return this.Preturno.guardarCuestionarioConcepto(body.id_preturno, body.cedula);
    }
    guardarCuestionario(body) {
        return this.Preturno.guardarCuestionarioMultiple(body.id_preturno, body.cedula);
    }
    guardarResultado(body) {
        this.Preturno.guardarResultadoMultiple(body.id_preturno, body.cedula, body.porcentaje1, body.porcentaje2, body.porcentaje3);
    }
    getValidarRespuestas(body) {
        return this.Preturno.validarRespuestasMultiple(body.respuestas);
    }
    vistoMultiple(body) {
        return this.Preturno.vistoMultiple(body.id_preturno, body.cedula);
    }
    vistoUnico(body) {
        return this.Preturno.vistoUnico(body.id_preturno, body.cedula);
    }
    vistoConcepto(body) {
        return this.Preturno.vistoConcepto(body.id_preturno, body.cedula);
    }
    guardarVisto(body) {
        return this.Preturno.guardarVisto(body.id_preturno, body.cedula);
    }
    visto(body) {
        return this.Preturno.visto(body.id_preturno, body.cedula);
    }
    validarocultar(body) {
        return this.Preturno.validadoOcultar(body.cedula, body.id_preturno);
    }
    avance(body) {
        return this.Preturno.avance(body.cedula, body.pcrc);
    }
    async getAllPreturnoLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.Preturno.getReportPreturnoLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    getallpreturnobyocrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaini, fechafin } = body;
        return this.Preturno.getReportPreturnoPcrc(id, fechaini, fechafin, limite, pag);
    }
    async getpreturnototal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.Preturno.getPreturnoTotal(fechaIn, fechaFin, id);
        return data;
    }
    guardarunica(body) {
        return this.Preturno.guardarPreguntasUnicas(body.idpreturno, body.preguntas, body.respuestas);
    }
    personasacargo(body) {
        return this.Preturno.personasAcargo(body.cedula);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('insertar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "insertarPreturno", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('mostrar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "mostrarPreturnos", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('mostraracargo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "mostrarPreturnosAcargo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('mostraradmin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "mostrarPreturnosadmin", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('borrar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "borrarPreturnos", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('actualizar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "actualizarPreturnos", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/guardarPreguntas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarPreguntas", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/guardarConcepto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarConcepto", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/total'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "validarTotal", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/totalcargo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "TotalCargo", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/aprobacion'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "aprobacion", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/obtenerpreguntas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getObligatorioPreguntas", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/obtenerpreguntasunica'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getObligatorioPreguntasUnica", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/obtenerpreguntasconcepto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getObligatorioPreguntasConcepto", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/obtenerespuestasconcepto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getObligatorioRespuestasConcepto", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarCuestionarioUnico'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarCuestionarioUnico", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarCuestionarioConcepto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarCuestionarioConcepto", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarCuestionarioMultiple'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarCuestionario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarResultadoMultiple'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarResultado", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/validarespuestasMultiple'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getValidarRespuestas", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/vistoMultiple'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "vistoMultiple", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/vistoUnico'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "vistoUnico", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/vistoConcepto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "vistoConcepto", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarVisto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarVisto", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/visto'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "visto", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/validarocultar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "validarocultar", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/avance'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "avance", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('preturnodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "getAllPreturnoLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('preturnopcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "getallpreturnobyocrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('preturnototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreturnoController.prototype, "getpreturnototal", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/guardarunica'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "guardarunica", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/personasacargo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreturnoController.prototype, "personasacargo", null);
PreturnoController = __decorate([
    common_1.Controller('api/preturno'),
    __metadata("design:paramtypes", [preturno_model_service_1.PreturnoModelService])
], PreturnoController);
exports.PreturnoController = PreturnoController;
//# sourceMappingURL=preturno.controller.js.map