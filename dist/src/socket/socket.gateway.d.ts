import { Socket } from "socket.io";
import { DbService } from "../databases/db.service";
export declare class SocketGateway {
    private db;
    socket: Socket;
    constructor(db: DbService);
    handleMessage(message: string): void;
    handleArticuloSave(client: Socket, data: any): Promise<boolean>;
    handleArticuloEdit(client: Socket, data: any): Promise<void>;
    handleComentarionRespuesta(client: Socket, data: any): Promise<void>;
}
