import { DbService } from "../databases/db.service";
export declare type token = {
    sub: string;
    name: string;
    rol: string;
    permiso: any;
    iat: number;
    exp: number;
};
export declare class UserjwtModelService {
    private db;
    constructor(db: DbService);
    crearJWT: (userId: string) => Promise<unknown[]>;
    borrarJWT: (userId: string) => Promise<unknown[]>;
    getJWT: (userId: any) => Promise<unknown[]>;
    generateJwt(user: any): string;
    generateRefresh_token(user: any): string;
    validateJwt(token: string): token;
    validateRefreshJwt(token: string): token;
    decodeToken(token: any): token;
}
