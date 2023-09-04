import { DbService } from "../databases/db.service";
import { Sesion } from "./entities";
export declare class sesionDTO {
    pcrc: string;
}
export declare class updateSesionDTO {
    logout: string;
}
export declare class UsersesionsModelService {
    private db;
    constructor(db: DbService);
    postUserSesion: (userid: any, sesionData: sesionDTO) => Promise<Sesion>;
    udpateUserSesion: (id: string) => Promise<Sesion[]>;
    getUserSesions: (userId: string) => Promise<Sesion[]>;
}
