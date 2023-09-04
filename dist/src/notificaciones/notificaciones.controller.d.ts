import { NotificacionesServices } from './notificaciones.service';
import { Response } from 'express';
export declare class NotificacionesController {
    private readonly notificaciones;
    constructor(notificaciones: NotificacionesServices);
    getDepurarNotificaciones(res: Response): Promise<Response<any>>;
    getNotificaciones(body: any): Promise<unknown[]>;
    getNotificacionesLeidas(body: any): Promise<unknown[]>;
    getNotificacionesNoLeidas(): Promise<void>;
    getNotificacionesById(documento: any): Promise<unknown>;
    getNotificacionesById2(documento: any): Promise<unknown>;
    getNotificationSaveArticle(body: any): Promise<unknown>;
    getNotificationUpdateArticle(body: any): Promise<unknown>;
    getNotificationResponseComment(body: any): Promise<unknown>;
    getNotificationActive(): Promise<unknown>;
    getNotificationDelete(id: any, res: any): Promise<any>;
}
