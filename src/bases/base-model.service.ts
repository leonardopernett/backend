import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { DbService } from "../databases/db.service"
import { baseRaw } from "./entities";
import { userRaw } from "../usuarios/entities";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Clientes } from 'src/jarvisEntities/clientes.entity';
export class postUserPcrcDTO {

    @IsNotEmpty()
    @IsString()
    public pcrc: string;
    client;
   

} 

export class postBaseDTO {

    @IsNotEmpty()
    @IsString()
    nombre:string

    @IsNotEmpty()
    @IsString()
    subaseNombre:string
    

} 
/* base */
export class postSubBaseDTO {

    @IsNotEmpty()
    @IsString()
    nombre:string
    
    @IsNotEmpty()
    @IsString()
    parentId:string


}

export type base = {
    id_dp_clientes: number;
    cliente: string;
    pcrcs: {
        id_dp_pcrc: number;
        pcrc: string;
        cod_pcrc:string;
    }[]
}

@Injectable()
export class BaseModelService {

    

    constructor(
        private db:DbService,
    ) { }

    private sortBy = (obj, key) => {
        return obj.sort(function (a, b) {
            var textA = a[key];
            var textB = b[key];
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
    }
    
    getAllBases = async () => {
        let bases:base[] = []

        let rawBases = await this.db.JARVIS<baseRaw>(`
            select
                a.id_dp_pcrc,
                a.pcrc,
                a.cod_pcrc,
                c.cliente,
                c.id_dp_clientes
                from dp_pcrc a
            inner join dp_clientes c
            on c.id_dp_clientes = a.id_dp_clientes
            where (a.estado = 1 OR a.estado=0)
            and c.estado = 1
        `)

        rawBases.forEach((baseRaw) => {
            var baseIndex = bases.findIndex(base => base.id_dp_clientes == baseRaw.id_dp_clientes)

            if(baseIndex != -1){
                bases[baseIndex].pcrcs.push({id_dp_pcrc:baseRaw.id_dp_pcrc, pcrc:baseRaw.pcrc, cod_pcrc:baseRaw.cod_pcrc})
            } else {
                var newBase:base = {
                    id_dp_clientes:baseRaw.id_dp_clientes,
                    cliente:baseRaw.cliente,
                    pcrcs:[
                        {
                            id_dp_pcrc:baseRaw.id_dp_pcrc,
                            pcrc:baseRaw.pcrc, 
                            cod_pcrc:baseRaw.cod_pcrc
                        }
                    ]
                }

                bases.push(newBase)
            }
        })

        let clientes:any = await this.db.NIK(`select
        a.id_dp_pcrc,
        a.pcrc,
        c.nombre,
        c.id_clientes
        from dp_pcrc_nik a
        inner join dp_clientes_nik c
        ON c.id_clientes = a.base_id`)

        clientes.forEach(data => {

            var baseIndex = bases.findIndex(base => base.id_dp_clientes == data.id_clientes)

            if(baseIndex != -1){
                bases[baseIndex].pcrcs.push({id_dp_pcrc:data.id_dp_pcrc, pcrc:data.pcrc,cod_pcrc:data.id_dp_pcrc})
            } else {
              
                var newBase2= {
                    id_dp_clientes:data.id_clientes,
                    cliente:data.nombre,
                    pcrcs:[
                        {
                            id_dp_pcrc:data.id_dp_pcrc,
                            pcrc:data.pcrc,
                            cod_pcrc:data.id_dp_pcrc
                        }
                    ]
                }

            bases.push(newBase2)
            
            }

        });

        return this.sortBy(bases, 'nombre')
    }

    getUserBases = async (userId: string)=> {

        var rawBases:baseRaw[]

        

        let permisos = await this.db.NIK<{base_id:string}>('call get_user_bases(?)',[userId])
    

        permisos.map(base => base.base_id).join(',')        

        if(userId == '1036673423'){
            rawBases = await this.db.JARVIS<baseRaw>(`
            select
            a.id_dp_pcrc,
            a.cod_pcrc,
            a.pcrc,
            c.cliente,
            c.id_dp_clientes
            from dp_pcrc a
            inner join dp_clientes c
            on c.id_dp_clientes = a.id_dp_clientes
            where c.estado = 1
            AND (a.estado = 1 OR a.estado=0)
            `)
        } else if(permisos.length > 0){
            rawBases = await this.db.JARVIS<baseRaw>(`
                select
                a.id_dp_pcrc,
                a.cod_pcrc,
                a.pcrc,
                c.cliente,
                c.id_dp_clientes
                from dp_pcrc a
                inner join dp_clientes c
                on c.id_dp_clientes = a.id_dp_clientes
                where a.id_dp_pcrc in (${permisos.map(base => base.base_id).join(',')})
                or a.cod_pcrc in (
                select 
                b.cod_pcrc
                from dp_distribucion_personal b
                where b.fecha_actual = DATE_FORMAT( now(), concat('%Y-%m','-01'))
                and b.documento = ?
            )`,[userId])
            
        } else {
            rawBases = await this.db.JARVIS<baseRaw>(`
                select
                a.id_dp_pcrc,
                a.cod_pcrc,
                a.pcrc,
                c.cliente,
                c.id_dp_clientes
                from dp_pcrc a
                inner join dp_clientes c
                on c.id_dp_clientes = a.id_dp_clientes
                where a.cod_pcrc in (
                    select 
                    b.cod_pcrc
                    from dp_distribucion_personal b
                    where b.fecha_actual = DATE_FORMAT( now(), concat('%Y-%m','-01'))
                    and b.documento = ?
                )
            `,[userId])

        }


        let bases:any = []

        rawBases.forEach((baseRaw) => {
            var baseIndex = bases.findIndex(base => base.id_dp_clientes == baseRaw.id_dp_clientes)

            if(baseIndex != -1){
                bases[baseIndex].pcrcs.push({id_dp_pcrc:baseRaw.id_dp_pcrc, pcrc:baseRaw.pcrc,cod_pcrc:baseRaw.cod_pcrc})
            } else {
                var newBase= {
                    id_dp_clientes:baseRaw.id_dp_clientes,
                    cliente:baseRaw.cliente,
                    pcrcs:[
                        {
                            id_dp_pcrc:baseRaw.id_dp_pcrc,
                            pcrc:baseRaw.pcrc,
                            cod_pcrc:baseRaw.cod_pcrc
                        }
                    ]
                }

                bases.push(newBase)
                
            }
        })

        let clientesNik

        if(permisos.length > 0){

        clientesNik = await this.db.NIK(`select
        a.id_dp_pcrc,
        a.pcrc,
        c.nombre,
        c.id_clientes
        from dp_pcrc_nik a
        inner join dp_clientes_nik c
        ON c.id_clientes = a.base_id
        WHERE a.id_dp_pcrc in (${permisos.map(base => base.base_id).join(',')})`)

        

        clientesNik.forEach(data => {

            var baseIndex = bases.findIndex(base => base.id_dp_clientes == data.id_clientes)

            if(baseIndex != -1){
                bases[baseIndex].pcrcs.push({id_dp_pcrc:data.id_dp_pcrc, pcrc:data.pcrc})
            } else {
              
                var newBase2= {
                    id_dp_clientes:data.id_clientes,
                    cliente:data.nombre,
                    pcrcs:[
                        {
                            id_dp_pcrc:data.id_dp_pcrc,
                            pcrc:data.pcrc
                        }
                    ]
                }

            bases.push(newBase2)
            
            }

        });

    }
       

      return  bases.sort( (a,b) => {
            if(a.cliente > b.cliente) return 1
            if(a.cliente < b.cliente) return -1
            return 0
        }) 
       
    
    
        
        
 }

    pcrcF:any[] = []

    postUserBase = async (userId: string, baseId: string, cedulaUsuarioAdmin: string) => {

        let [[nikUser], [jarvisUser]] = await Promise.all([
            this.db.NIK<userRaw>('call get_usuario_by_documento(?)',[userId]),
            this.db.JARVIS<{ nombre: string }>(`
                select
                    replace(concat(a.primer_nombre, ' ', a.segundo_nombre, ' ', a.primer_apellido, ' ', a.segundo_apellido),'  ',' ') as nombre
                from dp_datos_generales a
                where a.documento = ?
            `,[userId])
        ])

        if(!nikUser){
            await this.db.NIK<userRaw>(`call crear_usuario(?,?)`,[jarvisUser.nombre, userId])
        }

        if (baseId == 'todos') {
         

             this.pcrcF=[]

            let pcrcs:any=await this.db.nikcleanPoolConection.query('SELECT id_dp_pcrc FROM dp_pcrc')

            pcrcs[0].forEach(element=> {
                this.pcrcF.push([userId,element.id_dp_pcrc,0])
            });

            let pcrcnik:any=await this.db.nikcleanPoolConection.query('SELECT id_dp_pcrc FROM dp_pcrc_nik')

            pcrcnik[0].forEach(element=> {
                this.pcrcF.push([userId,element.id_dp_pcrc,0])
            });

            this.db.nikcleanPoolConection.query('INSERT IGNORE INTO usuario_base (documento,base_id,estado_permisos) VALUES ?',
            [this.pcrcF]) 
        
        } else {
            return await this.db.NIK('call asign_base_to_user(?, ? , ?)',[userId, baseId, '0'])
        }
    }
    
    deleteUserBase = async (user_id: string, base_id: string, idUsuarioAdmin?: string) => {
        if (base_id == 'todos') {
           
            return await this.db.nikcleanPoolConection.query('DELETE FROM usuario_base WHERE documento=?',[user_id])
             
        } else {
            return await this.db.NIK('call desasignar_base(?, ?)',[user_id, base_id])
        }
    }

    getBaseUsers = async (baseId: string) => {

        let nikUsers =  (await this.db.NIK<userRaw>('call get_base_users(?)',[baseId])).map(user => {
            return { cedula:user.documento, nombre:user.user_name }
        })

        let jarvisUsers = (await this.db.JARVIS<{ cedula:string, nombre:string }>(`
            select
            c.documento as cedula,
            replace(concat(c.primer_nombre, ' ', c.segundo_nombre, ' ', c.primer_apellido, ' ', c.segundo_apellido),'  ',' ') as nombre
            from dp_distribucion_personal a
            inner join dp_pcrc b
            on a.cod_pcrc = b.cod_pcrc
            inner join dp_datos_generales c
            on a.documento = c.documento
            where a.fecha_actual = DATE_FORMAT( now(), concat('%Y-%m','-01'))
            and b.id_dp_pcrc = ?
        `,[ baseId ])).filter(jarvisUser => {
            let usuarioDuplicado = nikUsers.find((nikUser:any) => {
                jarvisUser.cedula == nikUser.cedula
            })

            if(typeof usuarioDuplicado == 'undefined'){
                return true
            } else {
                return false
            }
        })

        return nikUsers.concat(jarvisUsers)
    }


    puedeCopiar = async (baseId:string)  => {

        let [permiso] =  await this.db.NIK<{id:number, base_id:number, puede_copiar:number}>(`call get_permiso_copiar(?)`, [baseId])

        return { base_id:baseId, puede_copiar: !!permiso?.puede_copiar && !!permiso?.id } 

    }

    cambiarPermisoCopiar = async (baseId:string)  => {

        let [permiso] =  await this.db.NIK<{id:number, base_id:number, puede_copiar:number}>(`call cambiar_permiso_copiar(?)`, [baseId])

        return { base_id:baseId, puede_copiar: !!permiso?.puede_copiar && !!permiso?.id }

    }

    async savebase(base){
        return this.db.nikcleanPoolConection.query('INSERT INTO dp_clientes_nik (nombre,tipo_base) VALUES (?, 2)',[base])
    }

    async savepcrc(pcrc,base_id){
        return this.db.nikcleanPoolConection.query('INSERT INTO dp_pcrc_nik (pcrc,base_id) VALUES (?, ?)',[pcrc,base_id])
    }

    async viewbase(){
        return this.db.NIK('SELECT * FROM dp_clientes_nik WHERE tipo_base=2')
    }

    async deletebase(idbase){
        return this.db.nikcleanPoolConection.query('DELETE FROM dp_clientes_nik WHERE id_clientes=?',[idbase])
    }

    async deletepcrc(idpcrc){
        return this.db.nikcleanPoolConection.query('DELETE FROM dp_pcrc_nik WHERE id_dp_pcrc=?',[idpcrc])
    }

    async updatebase(idbase,base){
        return this.db.nikcleanPoolConection.query('UPDATE dp_clientes_nik SET nombre = ? WHERE id_clientes=?',[base,idbase])
    }

    async updatepcrc(idpcrc,pcrc,id_base){
        return this.db.nikcleanPoolConection.query('UPDATE dp_pcrc_nik SET pcrc = ?,base_id = ? WHERE id_dp_pcrc=?',[pcrc,id_base,idpcrc])
    }

    async viewpcrc(idbase){
        return this.db.nikcleanPoolConection.query('SELECT * FROM dp_pcrc_nik WHERE base_id=?',[idbase])
    }



}  