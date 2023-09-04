"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const pdf_export_controller_1 = require("./articulos/pdf-export/pdf-export.controller");
const pdf_export_service_1 = require("./articulos/pdf-export/pdf-export.service");
const pdf_eport_module_1 = require("./articulos/pdf-export/pdf-eport.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const bases_module_1 = require("./bases/bases.module");
const permisos_module_1 = require("./permisos/permisos.module");
const categorias_module_1 = require("./categorias/categorias.module");
const articulos_module_1 = require("./articulos/articulos.module");
const s3_module_1 = require("./s3/s3.module");
const comentarios_module_1 = require("./comentarios/comentarios.module");
const news_module_1 = require("./news/news.module");
const elastic_search_module_1 = require("./elastic-search/elastic-search.module");
const web_sockets_module_1 = require("./web-sockets/web-sockets.module");
const databases_module_1 = require("./databases/databases.module");
const jwt_module_1 = require("./jwt/jwt.module");
const migracion_module_1 = require("./migracion/migracion.module");
const conectar_gateway_1 = require("./web-sockets/conectar.gateway");
const version_module_1 = require("./version/version.module");
const reporte_module_1 = require("./reporte/reporte.module");
const cargos_module_1 = require("./cargos/cargos.module");
const usuario_externo_module_1 = require("./usuario-externo/usuario-externo.module");
const repositorio_module_1 = require("./repositorio/repositorio.module");
const zendesk_module_1 = require("./zendesk/zendesk.module");
const automatizacion_module_1 = require("./automatizacion/automatizacion.module");
const socket_module_1 = require("./socket/socket.module");
const notificaciones_module_1 = require("./notificaciones/notificaciones.module");
const reporte_tabla_module_1 = require("./reportetabla/reporte-tabla.module");
const keys_module_1 = require("./keys/keys.module");
const papeleria_module_1 = require("./papeleria-reciclaje/papeleria.module");
const preturno_module_1 = require("./preturno/preturno.module");
const control_cambios_module_1 = require("./control-cambios/control-cambios.module");
const ldap_module_1 = require("./ldap/ldap.module");
const reset_module_1 = require("./reset/reset.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.JARVIS_HOST,
                port: 3306,
                username: process.env.JARVIS_USER,
                password: process.env.JARVIS_PASS,
                database: 'jarvis',
            }),
            pdf_eport_module_1.PdfEportModule,
            auth_module_1.AuthModule,
            databases_module_1.DatabasesModule,
            usuarios_module_1.UsuariosModule,
            jwt_module_1.JwtModule,
            bases_module_1.BasesModule,
            permisos_module_1.PermisosModule,
            categorias_module_1.CategoriasModule,
            articulos_module_1.ArticulosModule,
            elastic_search_module_1.ElasticSearchModule,
            s3_module_1.S3Module,
            news_module_1.NewsModule,
            comentarios_module_1.ComentariosModule,
            web_sockets_module_1.WebSocketsModule,
            migracion_module_1.MigracionModule,
            version_module_1.VersionModule,
            reporte_module_1.ReportesModule,
            cargos_module_1.cargosModule,
            usuario_externo_module_1.UsuarioExternoModule,
            repositorio_module_1.RepositorioModule,
            zendesk_module_1.ZendeskModule,
            socket_module_1.SocketModule,
            automatizacion_module_1.AutomatizacionModule,
            notificaciones_module_1.NotificacionesModule,
            reporte_tabla_module_1.ReportesTableModule,
            keys_module_1.KeysModule,
            papeleria_module_1.PapeleriaModule,
            preturno_module_1.PreturnoModule,
            control_cambios_module_1.ControlCambiosModule,
            ldap_module_1.LdapModule,
            reset_module_1.ResetModule
        ],
        controllers: [pdf_export_controller_1.PdfExportController],
        providers: [pdf_export_service_1.PdfExportService, conectar_gateway_1.ConectarGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map