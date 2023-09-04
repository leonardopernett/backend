import { DbService } from "../databases/db.service";
import { notificationRaw } from "./entities";
export declare class userNotificationDTO {
    id: string;
}
export declare class UserNotificationsModelService {
    private db;
    constructor(db: DbService);
    postUserNotification: (notificationId: string, userId: string) => Promise<void>;
    getUserNotifications: (userId: string, room: string) => Promise<notificationRaw[]>;
    deleteUserNotification: (notificationId: any, userId: any) => Promise<unknown[]>;
}
