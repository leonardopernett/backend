import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service"


@Injectable()
export class ReportsTableModelService {

    constructor(
        private db:DbService
    ) { }

  guardartable(data){
      this.db.NIK('INSERT INTO permisos_multiples_archivo (nombres, documento, url,fecha_ultima) VALUES (?,?,?,DATE_ADD(NOW(), INTERVAL -5 HOUR))',[data.user,data.documento,data.url])
  }

  guardarpermisos(origen,destino){
    this.db.NIK(`call agregar_permisos_multiples(?,?)`,[ origen.toString(),destino.toString()] )
}

async borrarpermisos(){
    this.db.NIK(`TRUNCATE TABLE permisos_multiples `)
}

obtenerpermisos(){
    return this.db.NIK(`SELECT nombres,documento,url,DATE_ADD(fecha_ultima, INTERVAL -5 HOUR) as fecha_ultima FROM permisos_multiples_archivo ORDER BY id DESC LIMIT 1`)
}


 
} 