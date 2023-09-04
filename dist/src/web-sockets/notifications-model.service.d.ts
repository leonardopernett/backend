import { DbService } from "../databases/db.service";
import { notificationRaw } from "./entities";
export declare class NotificationsModelService {
    private db;
    constructor(db: DbService);
    registerNotification(event: string, room: string, data: string): Promise<notificationRaw>;
    getNotificationsByDate(from: number, to: number, room: string): Promise<notificationRaw[]>;
}
