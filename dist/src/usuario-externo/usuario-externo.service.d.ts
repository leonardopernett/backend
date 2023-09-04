import { DbService } from '../databases/db.service';
export declare class UsuarioExternoService {
    private db;
    constructor(db: DbService);
    generateToke(email: any): string;
    sendmail(data: any): void;
    getuser(): Promise<unknown[]>;
    createuser(data: any): Promise<{
        mensaje: string;
    }>;
    deleteuser(id: any): Promise<{
        mensaje: string;
    }>;
}
