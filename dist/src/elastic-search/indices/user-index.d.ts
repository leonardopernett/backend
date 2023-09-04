import { Esindex } from "../esindex";
export interface user {
    cedula: string;
    nombre: string;
    rol: 'admin' | 'user' | 'publicador';
    pcrc: string[];
}
export declare class UserIndex extends Esindex<user> {
    constructor();
}
