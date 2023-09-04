import { Response } from 'express';
import { UserjwtModelService } from "../jwt/userjwt-model.service";
import { newAsignacionBases } from './newAsignacionBases';
declare class user {
    "sub": string;
    "name": string;
    "rol": string;
    "line": string;
    "subLine": string;
}
export declare class AuthController {
    private userjwtModel;
    private Asignacion;
    constructor(userjwtModel: UserjwtModelService, Asignacion: newAsignacionBases);
    login(req: any, res: Response): Promise<void>;
    logOut(req: any, res: Response): Promise<void>;
    refreshToken(req: any, res: Response): void;
    currentUser(req: any): Promise<user>;
}
export {};
