import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { DbService } from "../databases/db.service";
import { notificationRaw } from "./entities";
export class userNotificationDTO {
    id:string
}

@Injectable()
export class UserNotificationsModelService {

    constructor(
        private db:DbService
    ){  }

    postUserNotification = async (notificationId:string, userId:string) => {
        await this.db.NIK('call crear_notificacion_usuario(?, ?)',[userId, notificationId])
    }

    getUserNotifications = async (userId:string, room:string) => {
        return await this.db.NIK<notificationRaw>('call get_usuario_notificaciones(?, ?)',[userId, room])
    }

    deleteUserNotification = async (notificationId, userId) => {
        return await this.db.NIK('call borrar_notificacion_usuario(?, ?)',[userId, notificationId])
    }

    // deleteAllUserNotification = async (userId:string, room:string) => {

        

    //     let result = await Promise.all([
    //         this.usernotificationsIndex.deleteWhere({ room:room, userid:userId }),
    //         this.usernotificationsIndex.deleteWhere({ room:room+'/'+userId })
    //     ])

    //     return result
    // }

}