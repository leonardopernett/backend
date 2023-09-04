export type userRaw = {
    id: number
    user_name: string
    creation_date: string
    documento: string
    rol:string
    base_id:string
    id_rol:number
   
}

export type User = {
    sub:string,
    name:string,
    rol:string
}

export type Sesion = {
    login:string,
    logout:string,
    usuario_id:string,
    base_id:string
}

// export type perfil = {
//     id:number
//     nombre:string
// }

// export type baseRaw = {
//     parentId:number,
//     parentNombre:string,
//     subBaseId:number,
//     subBaseNombre:string
// }

// export type categoryRaw = {
//     id: number
//     name: string
//     position: number
//     icon: string
//     base_id: number
//     parent_id: number
// }