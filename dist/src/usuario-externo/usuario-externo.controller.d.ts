import { UsuarioExternoService } from '../usuario-externo/usuario-externo.service';
import { Request } from 'express';
export declare class UsuarioExternoController {
    Externo: UsuarioExternoService;
    constructor(Externo: UsuarioExternoService);
    sendmail(data: any): Promise<string>;
    createuser(rq: Request): Promise<{
        mensaje: string;
    }>;
    deleteuser(id: any): Promise<{
        mensaje: string;
    }>;
    getuser(): Promise<unknown[]>;
}
