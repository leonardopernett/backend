import { DbService } from "../databases/db.service";
import { userRaw } from "./entities";
import { articuloRaw } from 'src/articulos/entities';
import { BaseModelService } from '../bases/base-model.service';
export declare class updateUserRolDTO {
    rol: 'admin' | 'user' | 'publicador';
}
export declare class deleteUserDTO {
    id: string;
}
export declare class createUserDTO {
    nombre: string;
    documento: string;
}
export declare class UserModelService {
    private db;
    private baseModel;
    constructor(db: DbService, baseModel: BaseModelService);
    createUser(nombre: string, documento: string): Promise<userRaw>;
    getUserByUserName(userName: string): Promise<userRaw>;
    getUserByDocumento(userId: string): Promise<{
        cedula: string;
        nombre: string;
        rol: string;
        pcrc: any;
    }>;
    deleteUser(userId: string): Promise<any>;
    getUserFavorites(userId: string, baseId: string, from: string, size: string): Promise<articuloRaw[]>;
    searchUsers: (query: string, baseId: string) => Promise<unknown[]>;
    updateUser: (userId: string, newRol: string) => Promise<void>;
    getUserByUserBases(Cedula: string): Promise<userRaw>;
    getUserBase(documento: any): Promise<unknown[]>;
}
