import { Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service";

@Injectable()
export class KeysService {

    constructor( private db:DbService){ }

    async keysave(nombre,valor,descripcion){
        await this.db.nikcleanPoolConection.query('INSERT INTO llaves (nombre,valor,descripcion) VALUES (?,?,?)',[nombre,valor,descripcion])
    }
   
}