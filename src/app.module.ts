import { PdfExportController } from './articulos/pdf-export/pdf-export.controller';
import { PdfExportService } from './articulos/pdf-export/pdf-export.service';
import { PdfEportModule } from './articulos/pdf-export/pdf-eport.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* import { Clientes } from "./jarvisEntities/clientes.entity";
import { datosPersonales } from "./jarvisEntities/datosGenerales.entity";
import { Pcrc } from "./jarvisEntities/pcrc.entity";
import { Personal } from "./jarvisEntities/personal.entity";
import { CentrosCostos } from "./jarvisEntities/centrosCostos.entity"; */
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BasesModule } from './bases/bases.module';
import { PermisosModule } from './permisos/permisos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ArticulosModule } from './articulos/articulos.module';
import { S3Module } from './s3/s3.module';
// import { ClientesModule } from './clientes/clientes.module';
import { ComentariosModule } from './comentarios/comentarios.module';
// import { cargosModule } from './cargos/cargos.module';
import { NewsModule } from './news/news.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';
import { WebSocketsModule } from './web-sockets/web-sockets.module';
import { DatabasesModule } from './databases/databases.module';
import { JwtModule } from './jwt/jwt.module';
import { MigracionModule } from './migracion/migracion.module';
import { ConectarGateway } from './web-sockets/conectar.gateway';
import { VersionModule } from './version/version.module';
import { ReportesModule } from './reporte/reporte.module';
import { cargosModule } from './cargos/cargos.module';
import { UsuarioExternoModule } from './usuario-externo/usuario-externo.module';
import { RepositorioModule } from './repositorio/repositorio.module';
import { ZendeskModule } from './zendesk/zendesk.module';
import { AutomatizacionModule } from './automatizacion/automatizacion.module';

import { SocketModule } from './socket/socket.module';

import { NotificacionesModule } from './notificaciones/notificaciones.module';

import { ReportesTableModule } from './reportetabla/reporte-tabla.module';

import { KeysModule } from './keys/keys.module';

import { PapeleriaModule } from './papeleria-reciclaje/papeleria.module';
import { PreturnoModule } from './preturno/preturno.module';
import { ControlCambiosModule } from './control-cambios/control-cambios.module';
import { LdapModule } from './ldap/ldap.module';
import { ResetModule } from './reset/reset.module';

@Module({
  imports: [
 

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.JARVIS_HOST,
      port: 3306,
      username: process.env.JARVIS_USER,
      password: process.env.JARVIS_PASS,
      database: 'jarvis',
      /*  entities: [
        Pcrc,
        Clientes,
        Personal,
        datosPersonales,
        CentrosCostos
      ] ,
      synchronize: false,*/
    }),
     PdfEportModule,
     AuthModule,
    DatabasesModule,
    UsuariosModule,
    JwtModule,
    BasesModule,
    PermisosModule,
    CategoriasModule,
    ArticulosModule,
    ElasticSearchModule,
    S3Module,
    NewsModule,
    ComentariosModule,
    WebSocketsModule,
    MigracionModule,
    VersionModule,
    ReportesModule,
     cargosModule,
     UsuarioExternoModule,
     RepositorioModule,
     ZendeskModule,
     SocketModule,
     AutomatizacionModule,
     NotificacionesModule,
     ReportesTableModule,
     KeysModule,
     PapeleriaModule,
     PreturnoModule,
     ControlCambiosModule,
     LdapModule,
     ResetModule

  ],

  controllers: [PdfExportController],
  providers: [PdfExportService, ConectarGateway],
})
export class AppModule {}
