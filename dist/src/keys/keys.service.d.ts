import { DbService } from "../databases/db.service";
export declare class KeysService {
    private db;
    constructor(db: DbService);
    keysave(nombre: any, valor: any, descripcion: any): Promise<void>;
}
