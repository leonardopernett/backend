import { ResetModelService } from '../reset/reset.service';
export declare class ResetController {
    private Reset;
    constructor(Reset: ResetModelService);
    generarToken(body: any): Promise<void>;
    validarToken(body: any): Promise<any>;
    resetPass(body: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
}
