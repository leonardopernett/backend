import { DbService } from "../databases/db.service";
export declare class AutomatizacionModelService {
    private db;
    constructor(db: DbService);
    pcrc(): Promise<void>;
    cliente(): Promise<void>;
    consolidar(): Promise<void>;
    depurarVista(dias: any): Promise<string>;
    depurarBusqueda(dias: any): Promise<string>;
    depurarCambioArticulo(dias: any): Promise<string>;
    depurarComentario(dias: any): Promise<string>;
    depurarSesion(dias: any): Promise<string>;
    depurarTipoEvento(dias: any): Promise<string>;
    depurarJwt(dias: any): Promise<string>;
    depurarUsuario(dias: any): Promise<void>;
    depurarBackupBusqueda(dias: any): Promise<string>;
    depurarBackupCambioArticulo(dias: any): Promise<string>;
    depurarBackupSesion(dias: any): Promise<string>;
    depurarVistaMes(inicial: any, final: any): Promise<string>;
}
