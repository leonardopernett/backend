import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from "socket.io";
import { NotificationsModelService } from "./notifications-model.service";
import { UsersesionsModelService } from "../usuarios/usersesions-model.service";
export declare class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private notificationsModel;
    private usersesionsModel;
    constructor(notificationsModel: NotificationsModelService, usersesionsModel: UsersesionsModelService);
    afterInit(server: any): void;
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    subcribeToRoom(data: string, socket: Socket): Promise<import("./entities").notificationRaw[]>;
    newArticle(data: string, socket: Socket): Promise<void>;
    articleUpdate(data: string, socket: Socket): Promise<void>;
    nuevanoticia(data: string, socket: Socket): Promise<void>;
    newComment(data: string, socket: Socket): Promise<void>;
}
