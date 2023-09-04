import { Injectable } from '@nestjs/common';
import { json } from 'express';
import { DbService } from "../databases/db.service";
import { notificationRaw } from "./entities";

@Injectable()
export class NotificationsModelService {

    constructor(
        private db:DbService,
    ){  }

    async registerNotification(event:string, room:string, data:string){
        let [resutl] = await this.db.NIK<notificationRaw>('CALL crear_notificacion(?,?,?)',[event, room, data])
        return resutl
    }
    
    async getNotificationsByDate(from:number, to:number, room:string){
        return await this.db.NIK<notificationRaw>('CALL get_notificaciones_por_fecha(?,?,?)',[room, (new Date(from)).toJSON().slice(0, 19).replace('T', ' '), (new Date(to)).toJSON().slice(0, 19).replace('T', ' ')])
    }

}