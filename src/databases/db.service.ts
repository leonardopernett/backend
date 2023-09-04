import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Pool, RowDataPacket } from "mysql2/promise";
import * as mysql from "mysql2/promise";

@Injectable()
export class DbService {

    constructor(){}

    public nikcleanPoolConection = mysql.createPool({
        host     : process.env.NIK_DB_HOST,
        user     : process.env.NIK_DB_USER,
        password : process.env.NIK_DB_PASS,
        database : 'nik'
    })

    private nikPoolConection = mysql.createPool({
        host     : process.env.NIK_DB_HOST,
        user     : process.env.NIK_DB_USER,
        password : process.env.NIK_DB_PASS,
        database : 'nik'
    })

    private nikSlavePoolConection = mysql.createPool({
        host     : process.env.NIK_DB_HOST,
        user     : process.env.NIK_DB_USER,
        password : process.env.NIK_DB_PASS,
        database : 'nik'
    }) 

    private jarvisPoolConection = mysql.createPool({
        host     : process.env.JARVIS_HOST,
        user     : process.env.JARVIS_USER, 
        database : 'jarvis',
        password : process.env.JARVIS_PASS
    })

   

    public NIK = async <T>(sql:string, values?:string[]):Promise<T[]> => {

        try {
            var [rows] = await this.nikPoolConection.query(sql,values)
            if(sql.toLowerCase().includes('call')){
                return rows[0] as unknown as T[]
            } else {
                return rows as unknown as T[]
            }

        } catch(err) {
            console.log(err)
           /*  throw new HttpException({
                "error": `error code: DBerror`,
                "message": "internal_server_error"
            }, 500) */
        }
    }
 
    public JARVIS = async <T>(sql:string, values?:string[]):Promise<T[]> => {
        try {
            var [rows ] = values ? await this.jarvisPoolConection.query<RowDataPacket[]>(sql,values)  : await this.jarvisPoolConection.query<RowDataPacket[]>(sql) 
           
            if(sql.toLowerCase().includes('call')){
                return rows[0] as unknown as T[]
            } else {
                return rows as unknown as T[]
            } 

        } catch(err) {
            console.log(err)
            throw new HttpException({
                "error": `error code: DBerror`,
                "message": "internal_server_error"
            }, 500)
        }
    }

    public NIKSLAVE = async <T>(sql:string, values?:string[]):Promise<T[]> => {

        try {
            var [rows] = await this.nikSlavePoolConection.query(sql,values)
            if(sql.toLowerCase().includes('call')){
                return rows[0] as unknown as T[]
            } else {
                return rows as unknown as T[]
            }
    
        } catch(err) {
            console.log(err)
           /*  throw new HttpException({
                "error": `error code: DBerror`,
                "message": "internal_server_error"
            }, 500) */
        }
    }

}


