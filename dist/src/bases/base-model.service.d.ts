import { DbService } from "../databases/db.service";
export declare class postUserPcrcDTO {
    pcrc: string;
    client: any;
}
export declare class postBaseDTO {
    nombre: string;
    subaseNombre: string;
}
export declare class postSubBaseDTO {
    nombre: string;
    parentId: string;
}
export declare type base = {
    id_dp_clientes: number;
    cliente: string;
    pcrcs: {
        id_dp_pcrc: number;
        pcrc: string;
        cod_pcrc: string;
    }[];
};
export declare class BaseModelService {
    private db;
    constructor(db: DbService);
    private sortBy;
    getAllBases: () => Promise<any>;
    getUserBases: (userId: string) => Promise<any>;
    pcrcF: any[];
    postUserBase: (userId: string, baseId: string, cedulaUsuarioAdmin: string) => Promise<unknown[]>;
    deleteUserBase: (user_id: string, base_id: string, idUsuarioAdmin?: string) => Promise<unknown[]>;
    getBaseUsers: (baseId: string) => Promise<{
        cedula: string;
        nombre: string;
    }[]>;
    puedeCopiar: (baseId: string) => Promise<{
        base_id: string;
        puede_copiar: boolean;
    }>;
    cambiarPermisoCopiar: (baseId: string) => Promise<{
        base_id: string;
        puede_copiar: boolean;
    }>;
    savebase(base: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    savepcrc(pcrc: any, base_id: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    viewbase(): Promise<unknown[]>;
    deletebase(idbase: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    deletepcrc(idpcrc: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    updatebase(idbase: any, base: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    updatepcrc(idpcrc: any, pcrc: any, id_base: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    viewpcrc(idbase: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
}
