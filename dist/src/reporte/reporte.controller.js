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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const reporte_model_service_1 = require("../reporte/reporte-model.service");
const autorization_guard_1 = require("../jwt/autorization.guard");
let ReportsController = class ReportsController {
    constructor(ad, ReporteService) {
        this.ad = ad;
        this.ReporteService = ReporteService;
    }
    async getAllLecturaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportLecturaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getReportLecturaCategoriaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportLecturaCategoriaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllComentarioLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportComentarioLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllComentariocategoriaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportComentariocategoriaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllBaseDatosLimit(body, res) {
        const limite = 500;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportBaseDatosLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllBaseDatosCategoriaLimit(body, res) {
        const limite = 500;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportBaseDatosCategoriaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllCambioLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportCambioLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllCambioCategoriaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportCambioCategoriaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllUsuarioLimit(body, res) {
        const limite = 500;
        const pag = (body.page - 1) * limite;
        const { id } = body;
        const report = await this.ReporteService.getReportUsuarioLimit(id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllFinancieraLimit(body, res) {
        const { fechaIn, fechaFin } = body;
        const report = await this.ReporteService.getReportFinancieraLimit(fechaIn, fechaFin);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllObligatorioLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin, usuario } = body;
        const report = await this.ReporteService.getReportObligatorioLimit(id, fechaIn, fechaFin, usuario, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllObligatorioCategoriaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin, usuario, idcategoria } = body;
        const report = await this.ReporteService.getReportObligatorioCategoriaLimit(id, fechaIn, fechaFin, usuario, limite, pag, idcategoria);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    getalllecturabypcrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportLecturaPcrc(fechaIn, fechaFin, id, limite, pag);
    }
    getalllecturabycategoria(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportLecturaCategoria(fechaIn, fechaFin, id, limite, pag);
    }
    async getlecturatotal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getLecturaTotal(fechaIn, fechaFin, id);
        return data;
    }
    async getlecturacategoriatotal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getLecturaCategoria(fechaIn, fechaFin, id);
        return data;
    }
    getallcomentariobypcrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportComentarioPcrc(fechaIn, fechaFin, id, limite, pag);
    }
    getallcomentariobycategoria(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportComentarioCategoria(fechaIn, fechaFin, id, limite, pag);
    }
    async getcomentariototal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getComentarioTotal(fechaIn, fechaFin, id);
        return data;
    }
    async getcomentariocategoriatotal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getComentarioCategoriaTotal(fechaIn, fechaFin, id);
        return data;
    }
    getallbasedatosbypcrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportBaseDatosPcrc(fechaIn, fechaFin, id, limite, pag);
    }
    getallbasedatosbycategoria(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportBaseDatosCategoria(fechaIn, fechaFin, id, limite, pag);
    }
    async getbasedatostotal(body) {
        const { id } = body;
        let data = await this.ReporteService.getBaseDatosTotal(id);
        return data;
    }
    async getbasedatoscategoriatotal(body) {
        const { id } = body;
        let data = await this.ReporteService.getBaseDatosCategoriaTotal(id);
        return data;
    }
    getallcambiobypcrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportCambioPcrc(fechaIn, fechaFin, id, limite, pag);
    }
    getallcambiobycategoria(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportCambioCategoria(fechaIn, fechaFin, id, limite, pag);
    }
    async getcambiototal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getCambioTotal(fechaIn, fechaFin, id);
        return data;
    }
    async getcambiocategoriatotal(body) {
        const { id, fechaIn, fechaFin } = body;
        let data = await this.ReporteService.getCambioCategoriaTotal(fechaIn, fechaFin, id);
        return data;
    }
    getallusuariobypcrc(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        const { id } = body;
        return this.ReporteService.getReportUsuarioPcrc(id, limite, pag);
    }
    async getusuariototal(body) {
        const { id } = body;
        let data = await this.ReporteService.getUsuarioTotal(id);
        return data;
    }
    getAllCambio(body) {
        return this.ReporteService.getReportCambio(body.idarticulo, body.ini, body.fin);
    }
    getAllBases(body) {
        return this.ReporteService.getReportBases(body.idarticulo);
    }
    async getAllBasesCategory(body) {
        let res = [];
        const data = await this.ReporteService.getReportBasesCategory(body.idcategoria);
        for (let item of data) {
            let data2 = await this.ReporteService.getReportBases(item["id"]);
            res.push(...data2);
        }
        return res;
    }
    async getAllBasesCategoryLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        let res = [];
        const data = await this.ReporteService.getReportBasesCategoryLimit(body.idcategoria, limite, pag);
        for (let item of data) {
            let data2 = await this.ReporteService.getReportBases(item["id"]);
            res.push(...data2);
        }
        return res;
    }
    async getAllBasesPcrcLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        let res = [];
        const data = await this.ReporteService.getReportBasesPcrcLimit(body.idpcrc, limite, pag);
        for (let item of data) {
            let data2 = await this.ReporteService.getReportBases(item["id"]);
            res.push(...data2);
        }
        return res;
    }
    getAllBasesUsuario(body) {
        return this.ReporteService.getReportUsuario(body.id);
    }
    getAllBasesUsuarioLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.ReporteService.getReportUsuarioLimit(body.id, limite, pag);
    }
    getAllLectura(body) {
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportLectura(fechaIn, fechaFin, id);
    }
    getalllecturabycategory(body) {
        const { id, fechaIn, fechaFin } = body;
        return this.ReporteService.getReportLecturaCategory(fechaIn, fechaFin, id);
    }
    async getAllBasesLimit(body) {
        const { idpcrc } = body;
        let resp = [];
        const data = await this.ReporteService.getReportBasesPcrc(idpcrc);
        for (let index = 0; index < 10; index++) {
            resp.push(...await this.ReporteService.getReportBases(data[index].id));
        }
        return resp;
    }
    getCommentPcrc(req) {
        const { id, fechaIn, fechaFin } = req;
        return this.ReporteService.getCommnetByPcrc(id, fechaIn, fechaFin);
    }
    getCommentPcrcLimit(req) {
        const limite = 5;
        const pag = (req.page - 1) * limite;
        const { id, fechaIn, fechaFin } = req;
        return this.ReporteService.getCommnetByPcrcLimit(id, fechaIn, fechaFin, limite, pag);
    }
    getCategoriaById(id) {
        return this.ReporteService.getCategoryById(id);
    }
    getTotalArticulo(body) {
        return this.ReporteService.getTotalArticulo();
    }
    getTotalArticuloLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.ReporteService.getTotalArticuloLimit(limite, pag);
    }
    async getTotalFinancieraLimit(body, query) {
        const { inicial, final } = body;
        const { limit, page } = query;
        const offset = (page - 1) * limit;
        return await this.ReporteService.getTotalFinancieraLimit(inicial, final, limit, offset);
    }
    async getTotalFinanciera(body, res) {
        const { inicial, final } = body;
        const result = await this.ReporteService.getTotalFinanciera(inicial, final);
        const resp = await this.ReporteService.generaExcel(result, 5, Date.now());
        return res.json(resp);
    }
    async getAllBasesPcrc(body, resp) {
        let res = [];
        const data = await this.ReporteService.getReportBasesPcrc(body.idpcrc);
        for (let item of data) {
            let data2 = await this.ReporteService.getReportBases(item["id"]);
            res.push(...data2);
        }
        let result = res.map((item) => {
            if (item.indiceUtilidad == null || item.indiceNoUtilidad == null) {
                item.indiceUtilidad = 0;
                item.indiceNoUtilidad = 0;
                item.tasarebote = item.tasarebote == null ? "0" : parseInt(item.tasarebote).toFixed();
                return item;
            }
            else {
                item.indiceUtilidad = item.indiceUtilidad;
                item.indiceNoUtilidad = item.indiceNoUtilidad;
                item.tasarebote = item.tasarebote == null ? "0" : parseInt(item.tasarebote).toFixed();
                return item;
            }
        });
        const datos = await this.ReporteService.generaExcel(result, 3, Date.now());
        return resp.json(datos);
    }
    async getAllLecturaData(body, res) {
        const { id, fechaIn, fechaFin } = body;
        const reporteLectura = await this.ReporteService.getReportLecturaData(fechaIn, fechaFin, id);
        const resp = await this.ReporteService.generaExcel(reporteLectura, 4, Date.now());
        return res.json(resp);
    }
    async getAllComentarioData(body, res) {
        const { id, fechaIn, fechaFin } = body;
        const reportesComentarios = await this.ReporteService.getCommnetByPcrc(id, fechaIn, fechaFin);
        const resp = await this.ReporteService.generaExcel(reportesComentarios, 1, Date.now());
        return res.json(resp);
    }
    async getReportCambioData(req, res) {
        const { idarticulo, ini, fin } = req.body;
        const reportesCambios = await this.ReporteService.getReportCambio(idarticulo, ini, fin);
        const resp = await this.ReporteService.generaExcel(reportesCambios, 2, Date.now());
        return res.json(resp);
    }
    async getReportCambioRemove(query, res) {
        const { id } = query;
        const response = await this.ReporteService.deleteReport(id);
        return res.status(200).json(response);
    }
    async getReportlecuraRemove(query, res) {
        const { id } = query;
        const response = await this.ReporteService.deleteReport(id);
        return res.status(200).json(response);
    }
    async getReportbaseRemove(query, res) {
        const { id } = query;
        const response = await this.ReporteService.deleteReport(id);
        return res.status(200).json(response);
    }
    async getReportcomentarioRemove(query, res) {
        const { id } = query;
        const response = await this.ReporteService.deleteReport(id);
        return res.status(200).json(response);
    }
    async getReportfinancieraRemove(query, res) {
        const { id } = query;
        const response = await this.ReporteService.deleteReport(id);
        return res.status(200).json(response);
    }
    async depurarAllreport(res) {
        await this.ReporteService.depurarReporte();
        return res.json('reporte depurado');
    }
    getObligatorioPcrcLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.ReporteService.getReportObligatorioPcrc(body.pcrc, body.fechaini, body.fechafinal, body.usuarios, limite, pag);
    }
    getObligatorioCategoryLimit(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.ReporteService.getObligatorioCategoria(body.pcrc, body.fechaini, body.fechafinal, body.usuarios, limite, pag, body.categoria);
    }
    getObligatorioTotal(body) {
        return this.ReporteService.getObligatorioTotal(body.pcrc, body.fechaini, body.fechafinal, body.usuarios);
    }
    getObligatoriocategoriaTotal(body) {
        return this.ReporteService.getObligatorioCategoriaTotal(body.pcrc, body.fechaini, body.fechafinal, body.usuarios, body.categoria);
    }
};
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllLecturaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturacategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportLecturaCategoriaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllComentarioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariocategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllComentariocategoriaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatosdescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBaseDatosLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatoscategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBaseDatosCategoriaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllCambioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiocategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllCambioCategoriaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('usuariodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllUsuarioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('financieradescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllFinancieraLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('obligatoriodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllObligatorioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('obligatoriocategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllObligatorioCategoriaLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturapcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getalllecturabypcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturacategoria'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getalllecturabycategoria", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getlecturatotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lecturacategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getlecturacategoriatotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariopcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallcomentariobypcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariocategoria'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallcomentariobycategoria", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getcomentariototal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('comentariocategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getcomentariocategoriatotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatospcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallbasedatosbypcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatoscategoria'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallbasedatosbycategoria", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatostotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getbasedatostotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('basedatoscategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getbasedatoscategoriatotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiopcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallcambiobypcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiocategoria'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallcambiobycategoria", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getcambiototal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambiocategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getcambiocategoriatotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('usuariopcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getallusuariobypcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('usuariototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getusuariototal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cambio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAllCambio", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('bases'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAllBases", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('bases/category'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBasesCategory", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('bases/categorylimit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBasesCategoryLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('bases/pcrclimit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBasesPcrcLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('usuario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAllBasesUsuario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('usuariolimit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAllBasesUsuarioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lectura'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAllLectura", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('lectura/category'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getalllecturabycategory", null);
__decorate([
    common_1.Post('bases/pcrc/limite'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBasesLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('comentarios'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getCommentPcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('comentarioslimit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getCommentPcrcLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('categoria/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getCategoriaById", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('totalarticulos'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTotalArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('totalarticuloslimit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTotalArticuloLimit", null);
__decorate([
    common_1.Post('financieralimit'),
    __param(0, common_1.Body()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTotalFinancieraLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('financiera'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTotalFinanciera", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('bases/pcrc'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllBasesPcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('lectura/data'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllLecturaData", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('comentarios/data'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllComentarioData", null);
__decorate([
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('cambio/data'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportCambioData", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('cambio/remove'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportCambioRemove", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('lectura/remove'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportlecuraRemove", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('base/remove'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportbaseRemove", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('comentario/remove'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportcomentarioRemove", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('financiera/remove'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getReportfinancieraRemove", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('debug'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "depurarAllreport", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('obligatoriopcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getObligatorioPcrcLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('obligatoriocategory'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getObligatorioCategoryLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('obligatoriototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getObligatorioTotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('obligatoriocategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getObligatoriocategoriaTotal", null);
ReportsController = __decorate([
    common_1.Controller('api/reports'),
    __param(0, common_1.Inject('activeDirectory')),
    __metadata("design:paramtypes", [Object, reporte_model_service_1.ReportsModelService])
], ReportsController);
exports.ReportsController = ReportsController;
//# sourceMappingURL=reporte.controller.js.map