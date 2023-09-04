import { DbService } from "../databases/db.service";
export declare class ZendeskModelService {
    private db;
    constructor(db: DbService);
    reemplazarTodos(texto: any, reemplazarQue: any, reemplazarCon: any, ignorarMayMin: any): any;
    guardarzendesk(): Promise<void>;
    getarticulozendesk(): Promise<unknown[]>;
    changearticulozendesk(articulo: any): Promise<unknown[]>;
    actualizarzendesk(): Promise<void>;
    datacargada(): Promise<any[]>;
    borrarzendesk(): Promise<void>;
    borrarzendeskfaq(): Promise<void>;
    migrarzendesk(): Promise<void>;
}
