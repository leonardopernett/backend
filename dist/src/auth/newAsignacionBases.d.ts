import { DbService } from "../databases/db.service";
export declare class newAsignacionBases {
    private db;
    constructor(db: DbService);
    AsignarPermisoAutomatizado(cedula: any): Promise<void>;
    AsignarOrigenUsuario(cedula: any): Promise<void>;
    AsignacionBases(cedula: any): Promise<void>;
    AsignacionBaseNik(cedula: any): Promise<void>;
    borrarpermisosusuario(cedula: any): void;
}
