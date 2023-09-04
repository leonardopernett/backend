import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export interface user {
    cedula:string;
    nombre:string;
    rol: 'admin' | 'user' | 'publicador';
    pcrc:string[];
}

@Injectable()
export class UserIndex extends Esindex<user> {
    constructor() {
        super('users', process.env.ES_PUNTO_ENLACE)
    }
}