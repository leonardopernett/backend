import { DbService } from "../databases/db.service";
export declare class ResetModelService {
    private db;
    constructor(db: DbService);
    generarToken(email: any): Promise<void>;
    validartoken(token: any): any;
    resetPassword(email: any, nuevopassword: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
}
