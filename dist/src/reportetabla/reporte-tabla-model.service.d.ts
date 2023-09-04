import { DbService } from "../databases/db.service";
export declare class ReportsTableModelService {
    private db;
    constructor(db: DbService);
    guardartable(data: any): void;
    guardarpermisos(origen: any, destino: any): void;
    borrarpermisos(): Promise<void>;
    obtenerpermisos(): Promise<unknown[]>;
}
