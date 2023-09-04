import { Response } from 'express';
import { ZendeskModelService } from '../zendesk/zendesk-model.service';
export declare class ZendeskController {
    private zendesk;
    constructor(zendesk: ZendeskModelService);
    getArticulo(): Promise<unknown[]>;
    changeArticulo(articulo: any): Promise<unknown[]>;
    cargardata(res: Response): Promise<Response<any>>;
    updatetotal(res: Response): Promise<Response<any>>;
    borrar(res: Response): Promise<Response<any>>;
}
