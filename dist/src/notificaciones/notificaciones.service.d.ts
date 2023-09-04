import { DbService } from '../databases/db.service';
export declare class NotificacionesServices {
    private db?;
    constructor(db?: DbService);
    getNotificaciones(documento?: string, page?: any): Promise<unknown[]>;
    getNotificacionesLeidas(documento: string, id_notificacion: any): Promise<unknown[]>;
    getById(documento: any): Promise<unknown>;
    getDepuracion(): Promise<unknown[]>;
    getCreateArticle(data: any): Promise<unknown>;
    getUpdateArticle(data: any): Promise<unknown>;
    getComment(data: any): Promise<unknown>;
    getActive(): Promise<unknown[]>;
    deleteNotificaciones(id: any): Promise<unknown[]>;
}
