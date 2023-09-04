import { DbService } from "../databases/db.service";
import { perfil, permiso } from './entities';
export declare class perfilDTO {
    nombre: string;
}
export declare class permisoDTO {
    accion: string;
    objeto: string;
}
export declare class asignarPerfilDTO {
    perfil: string;
}
export declare class PermisionsModelService {
    private db;
    constructor(db: DbService);
    crearPerfil: (nombre: string) => Promise<perfil[]>;
    getPerfiles: () => Promise<perfil[]>;
    actualizarPerfil: (id: string, nuevoNombre: string) => Promise<unknown[]>;
    borrarPerfil: (id: string) => Promise<unknown[]>;
    asignarPermiso: (idPerfil: string, permiso: permisoDTO) => Promise<permiso[]>;
    borrarPermiso: (idPermiso: string) => Promise<unknown[]>;
    getPermisos: (idPerfil: string) => Promise<permiso[]>;
    actualizarPermiso: (idPermiso: string, permiso: permisoDTO) => Promise<unknown[]>;
    asignarPerfil: (userId: string, perfilId: string) => Promise<unknown[]>;
    desasignarPerfil: (userId: string, perfilId: string) => Promise<unknown[]>;
    getUserPerfiles: (userId: string) => Promise<perfil[]>;
    getuserpermiso(cedula: any): Promise<any>;
    obteneridusuario(cedula: any): Promise<any>;
    permisoscategorias(): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    permisoscategoriasapi(): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    buscarusuarioapi(usuario: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    permisos(idusuario: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    asignacionpermisos(idpermiso: any, idusuario: any, accion: any): boolean;
    asignacionpermisosapi(idpermiso: any, idusuario: any, accion: any): boolean;
    permisos_api(iduser: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    permisoasignarol(idrol: any, idpermiso: any, accion: any): boolean;
    getRoles(idusuario: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    asignarol(idusuario: any, idrol: any): Promise<void>;
    obtenerol(): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    obteneruserapi(): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    crearol(rol: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    crearusuarioapi(usuario: any, password: any, estado: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    editarusuarioapi(id: any, usuario: any, password: any, estado: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    eliminarusuarioapi(id: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    editarol(rol: any, idrol: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    eliminarol(idrol: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    obtenerpermisorol(idrol: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
}
