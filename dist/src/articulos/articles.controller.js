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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../jwt/jwt.guard");
const articles_model_service_1 = require("./articles-model.service");
const user_decorator_1 = require("../user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const s3_bucket_service_1 = require("../s3/s3-bucket.service");
const verifytoken_guard_1 = require("../auth/verifytoken.guard");
const autorization_guard_1 = require("../jwt/autorization.guard");
const { convertDeltaToHtml } = require('node-quill-converter');
let ArticlesController = class ArticlesController {
    constructor(articlesModel, S3BucketService) {
        this.articlesModel = articlesModel;
        this.S3BucketService = S3BucketService;
    }
    validarCaptcha() {
        return this.articlesModel.validarcaptcha();
    }
    validarbusqueda() {
        return this.articlesModel.validarbusqueda();
    }
    accioncaptcha(body) {
        return this.articlesModel.accioncaptcha(body.captcha);
    }
    accionbusqueda(body) {
        return this.articlesModel.accionbusqueda(body.busqueda);
    }
    Article(id, user) {
        return this.articlesModel.getArticle(id);
    }
    Like(idArticulo, user) {
        return this.articlesModel.actualizarValoraciones(idArticulo, "1102850901", 'like');
    }
    DisLike(idArticulo, user) {
        return this.articlesModel.actualizarValoraciones(idArticulo, "1102850901", 'disLike');
    }
    Favorite(idArticulo, user) {
        return this.articlesModel.addFavorite(idArticulo, "1102850901");
    }
    singleArticle(id, user) {
        return this.articlesModel.getArticle(id);
    }
    singleArticle2(id, user) {
        return this.articlesModel.getArticle(id);
    }
    prueba(id, user) {
        return this.articlesModel.prueba();
    }
    deleteArticle(id, user) {
        return this.articlesModel.deleteArticle(id, user.sub, user.name);
    }
    createArticle(body, user) {
        return this.articlesModel.createArticle(body, user.sub);
    }
    cambiarArticulo(body) {
        return this.articlesModel.cambiararticulo(body.id_articulo, body.base, body.categoria);
    }
    createArticleRequired(body) {
        return this.articlesModel.creararticlerequired(body.idarticulo, body.idpcrc, body.fechainicial, body.fechafinal, body.title, body.active);
    }
    VerifyRequired(body) {
        return this.articlesModel.verifyrequired(body.idarticulo, body.cedula);
    }
    VerifyRequiredFecha(body) {
        return this.articlesModel.verifyrequiredfecha(body.idarticulo);
    }
    Active(body) {
        return this.articlesModel.active(body.id_articulo, body.cedula);
    }
    VerifyRequiredJarvis(body) {
        return this.articlesModel.verifyrequiredjarvis(body.cedula);
    }
    VerifyArticleJarvis(body) {
        return this.articlesModel.verifyarticlejarvis(body.idarticulo);
    }
    tablaobligatorios() {
        return this.articlesModel.tablaobligatorios();
    }
    viewRequired(body) {
        return this.articlesModel.viewarticlerequired(body.id_articulo, body.cedula);
    }
    validarCuestionario(body) {
        return this.articlesModel.validarCuestionario(body.id_articulo, body.cedula);
    }
    guardarCuestionario(body) {
        return this.articlesModel.guardarCuestionario(body.id_articulo, body.cedula);
    }
    guardarResultado(body) {
        this.articlesModel.guardarResultado(body.id_articulo, body.cedula, body.respuestas);
    }
    buscarRequired(body) {
        return this.articlesModel.buscararticulo(body.buscar);
    }
    ArticleRequiredTotal(body) {
        return this.articlesModel.totalarticlerequired(body.id_pcrc, body.cedula);
    }
    editarPeriodo(body) {
        return this.articlesModel.editarperiodo(body.inicial, body.final, body.titulo, body.id);
    }
    uploadFile(file, idArticle) {
        return this.articlesModel.uploadFile(idArticle, file);
    }
    getFile(idArticle, fileName, res) {
        let stream = this.S3BucketService.getFile(idArticle, fileName);
        stream.on('error', function (err) {
            res.status(500).json({ error: "Error -> " + err });
        }).pipe(res);
    }
    getArticleFiles(file, idArticle) {
        return this.articlesModel.getArticuloFiles(idArticle);
    }
    updateArticle(body, user, id) {
        return this.articlesModel.updateArticle(id, body, user.sub);
    }
    addLike(idArticulo, user) {
        return this.articlesModel.actualizarValoraciones(idArticulo, user.sub, 'like');
    }
    addDisLike(idArticulo, user) {
        return this.articlesModel.actualizarValoraciones(idArticulo, user.sub, 'disLike');
    }
    addFavorite(idArticulo, user) {
        return this.articlesModel.addFavorite(idArticulo, user.sub);
    }
    addViews(idArticulo, user, body) {
        return this.articlesModel.addArticleView(idArticulo, body.initialDate, body.finalDate, user.sub);
    }
    getcliente() {
        return this.articlesModel.getCliente();
    }
    getpcrc(body) {
        return this.articlesModel.getPcrc(body.idpcrc);
    }
    getObligatorioEdit(body) {
        return this.articlesModel.getObligatorioEdit(body.id);
    }
    getObligatorioPreguntas(body) {
        return this.articlesModel.getObligatorioPreguntas(body.id_obligatorio);
    }
    getValidarRespuestas(body) {
        return this.articlesModel.validarRespuestas(body.respuestas);
    }
    guardarPreguntas(body) {
        return this.articlesModel.guardarPreguntas(body.idobligatorio, body.preguntas, body.respuestas);
    }
    resultadoCuestionario(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.articlesModel.resultadosCuestionario(body.fechaini, body.fechafin, body.idpcrc, limite, pag);
    }
    resultadocategoriaCuestionario(body) {
        const limite = 5;
        const pag = (body.page - 1) * limite;
        return this.articlesModel.resultadoscategoriaCuestionario(body.fechaini, body.fechafin, body.categoria, limite, pag);
    }
    getcuestionarioTotal(body) {
        return this.articlesModel.CuestionarioTotal(body.pcrc, body.fechaini, body.fechafin);
    }
    getcuestionariocategoriaTotal(body) {
        return this.articlesModel.CuestionariocategoriaTotal(body.categoria, body.fechaini, body.fechafin);
    }
    async getAllCuestionarioLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.articlesModel.getReportCuestionarioLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    async getAllCuestionarioCategoriaLimit(body, res) {
        const limite = 100000;
        const pag = (body.page - 1) * limite;
        const { id, fechaIn, fechaFin } = body;
        const report = await this.articlesModel.getReportCuestionariocategoriaLimit(fechaIn, fechaFin, id, limite, pag);
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);
    }
    habilitarobligatorio(body) {
        return this.articlesModel.habilitarobligatorio(body.idarticulo);
    }
    async getMultipleUser(body) {
        return await this.articlesModel.getMultipleUser(body.pcrc);
    }
    async guardarpcrcautomatizados(body) {
        return await this.articlesModel.guardarpcrcautomatizado(body.origen, body.destino);
    }
    async eliminarpcrcautomatizados(body) {
        return await this.articlesModel.eliminarpcrcautomatizado(body.id);
    }
};
__decorate([
    common_1.Get('/recaptcha'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "validarCaptcha", null);
__decorate([
    common_1.Get('/busqueda'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "validarbusqueda", null);
__decorate([
    common_1.Post('/accioncaptcha'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "accioncaptcha", null);
__decorate([
    common_1.Post('/accionbusqueda'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "accionbusqueda", null);
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Get(':id/unico'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "Article", null);
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Post(':id/megusta'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "Like", null);
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Post(':id/disgusta'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "DisLike", null);
__decorate([
    common_1.UseGuards(verifytoken_guard_1.VerifyGuard),
    common_1.Post(':id/favoritos'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "Favorite", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "singleArticle", null);
__decorate([
    common_1.UseGuards(autorization_guard_1.AutorizationGuard),
    common_1.Get('unico/:id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "singleArticle2", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Get('prueba/prueba'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "prueba", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "deleteArticle", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [articles_model_service_1.articleDTO, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "createArticle", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/cambiararticulo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "cambiarArticulo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/required'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "createArticleRequired", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/requiredverify'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "VerifyRequired", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/requiredverifyfecha'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "VerifyRequiredFecha", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/active'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "Active", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/requiredverifyjarvis'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "VerifyRequiredJarvis", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/verifyarticlesjarvis'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "VerifyArticleJarvis", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Get('/tablarequired/obligatorios'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "tablaobligatorios", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/viewrequired'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "viewRequired", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/validarCuestionario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "validarCuestionario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarCuestionario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "guardarCuestionario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/guardarResultado'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "guardarResultado", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/buscarequired'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "buscarRequired", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/totalrequired'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "ArticleRequiredTotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/editarperiodo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "editarPeriodo", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post(':idArticle/files'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('UploadFiles')),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('idArticle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "uploadFile", null);
__decorate([
    common_1.Get(':idArticle/files/:fileName'),
    common_1.Header('Content-Disposition', `inline`),
    __param(0, common_1.Param('idArticle')),
    __param(1, common_1.Param('fileName')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getFile", null);
__decorate([
    common_1.Get(':idArticle/files'),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('idArticle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getArticleFiles", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [articles_model_service_1.updateArticleDTO, Object, String]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "updateArticle", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(':id/likes'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "addLike", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(':id/disLikes'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "addDisLike", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(':id/favorites'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "addFavorite", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post(':id/views'),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, articles_model_service_1.articleViewsDTO]),
    __metadata("design:returntype", Object)
], ArticlesController.prototype, "addViews", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/getcliente'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getcliente", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/getpcrc'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getpcrc", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('/getobligatorioedit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getObligatorioEdit", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/obtenerpreguntas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getObligatorioPreguntas", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/validarespuestas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getValidarRespuestas", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/guardarPreguntas'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "guardarPreguntas", null);
__decorate([
    common_1.Post('/resultadoCuestionario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "resultadoCuestionario", null);
__decorate([
    common_1.Post('/resultadocategoriaCuestionario'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "resultadocategoriaCuestionario", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('cuestionariototal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getcuestionarioTotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Post('cuestionariocategoriatotal'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "getcuestionariocategoriaTotal", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cuestionariodescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getAllCuestionarioLimit", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.HttpCode(200),
    common_1.Post('cuestionariocategoriadescargar'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getAllCuestionarioCategoriaLimit", null);
__decorate([
    common_1.Post('/habilitarobligatorio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "habilitarobligatorio", null);
__decorate([
    common_1.Post('/multipleuser'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getMultipleUser", null);
__decorate([
    common_1.Post('/guardarpcrcautomatizados'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "guardarpcrcautomatizados", null);
__decorate([
    common_1.Post('/eliminarpcrcautomatizados'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "eliminarpcrcautomatizados", null);
ArticlesController = __decorate([
    common_1.Controller('api/articles'),
    __metadata("design:paramtypes", [articles_model_service_1.ArticlesModelService,
        s3_bucket_service_1.S3BucketService])
], ArticlesController);
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=articles.controller.js.map