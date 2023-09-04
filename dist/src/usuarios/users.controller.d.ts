import { User as U } from "./entities";
import { BaseModelService, postUserPcrcDTO } from "../bases/base-model.service";
import { updateUserRolDTO, UserModelService, createUserDTO } from "./user-model.service";
import { UsersesionsModelService, sesionDTO } from "./usersesions-model.service";
import { UserNotificationsModelService, userNotificationDTO } from "../web-sockets/userNotifications-model.service";
import { PermisionsModelService } from '../permisos/permisions-model.service';
export declare class UsersController {
    private userModel;
    private permisionsModel;
    private baseModel;
    private usersesionsModel;
    private userNotificationsModel;
    constructor(userModel: UserModelService, permisionsModel: PermisionsModelService, baseModel: BaseModelService, usersesionsModel: UsersesionsModelService, userNotificationsModel: UserNotificationsModelService);
    getSelfFavorite(user: U, from: string, size: string, baseId: string): any;
    getUsers(query: string, pcrcId: string): any;
    createUser(userDto: createUserDTO): any;
    getSingleUser(user_id: string): Promise<{
        cedula: string;
        nombre: string;
        rol: string;
        pcrc: any;
    }>;
    getSingleUser2(user_id: string): Promise<{
        cedula: string;
        nombre: string;
        rol: string;
        pcrc: any;
    }>;
    deleteSingleUser(user_id: string): Promise<any>;
    updateSingleUser(user_id: string, body: updateUserRolDTO): Promise<void>;
    getSelfFavorites(user: U, from: string, size: string, baseId: string): any;
    getUserPcrc(idUser: string): any;
    getUserPcrc2(idUser: string): any;
    postUserPcrc(userId: string, body: postUserPcrcDTO, user: U): Promise<unknown[]>;
    deleteUserPcrc(idUser: string, baseId: string, user: U): any;
    postUserSesion(body: sesionDTO, user: U): any;
    updateUserSesion(id: string, user: U): any;
    getUserSessions(id: string, from: string, size: string, pcrc: string, user: U): any;
    postUserNotification(body: userNotificationDTO, user: U): any;
    getUserNotification(pcrc: string, user: U): any;
    deleteUserNotification(id: string, user: U): any;
    getUserBase(documento: any): Promise<unknown[]>;
}
