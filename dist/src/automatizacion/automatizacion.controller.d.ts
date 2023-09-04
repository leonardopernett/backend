import { AutomatizacionModelService } from '../automatizacion/automatizacion-model.service';
import { Response } from 'express';
export declare class AutomatizacionController {
    private Automatizacion;
    constructor(Automatizacion: AutomatizacionModelService);
    consulta(): Promise<void>;
    consultados(): Promise<void>;
    consolidar(): Promise<void>;
    depurarVista(dias: any, res: Response): Promise<Response<any>>;
    depurarBusqueda(dias: any, res: Response): Promise<Response<any>>;
    depurarCambioArticulo(dias: any, res: Response): Promise<Response<any>>;
    depurarComentario(dias: any, res: Response): Promise<Response<any>>;
    depurarSesion(dias: any, res: Response): Promise<Response<any>>;
    depurarTipoEvento(dias: any, res: Response): Promise<Response<any>>;
    depurarJwt(dias: any, res: Response): Promise<Response<any>>;
    depurarUsuario(dias: any): Promise<void>;
    depurarBackupBusqueda(dias: any, res: Response): Promise<Response<any>>;
    depurarBackupCambioArticulo(dias: any, res: Response): Promise<Response<any>>;
    depurarBackupSesion(dias: any, res: Response): Promise<Response<any>>;
    depurarVistaMes(inicial: any, final: any, res: Response): Promise<Response<any>>;
}
