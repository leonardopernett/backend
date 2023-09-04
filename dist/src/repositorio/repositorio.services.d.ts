import { DbService } from '../databases/db.service';
export declare class RepositorioServices {
    private db;
    constructor(db: DbService);
    saveReposit(file: any): Promise<unknown[]>;
    getRePositoryId(id: any): Promise<unknown[]>;
    deleteBorrador(id: any, user: any): Promise<unknown[]>;
}
