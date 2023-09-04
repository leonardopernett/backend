import { DbService } from "../databases/db.service";
export declare class ControlCambiosModelService {
    private db;
    constructor(db: DbService);
    mostrarcontroldecambio(idarticulo: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    cambioselect(idarticulo: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    mostrarcambio(idcambio: any): Promise<any>;
    convertirDelta(delta: any): string;
}
