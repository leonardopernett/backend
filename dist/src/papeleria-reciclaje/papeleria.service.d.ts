import { DbService } from '../databases/db.service';
export declare class PapeleriaService {
    private db;
    constructor(db: DbService);
    getAllArticledelete(): Promise<unknown[]>;
    deleteArticlePermanent(id: any): Promise<unknown[]>;
    depuracionPapeleriaReciclaje(): Promise<void>;
}
