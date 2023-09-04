// export type userRaw = {
//     id: number
//     user_name: string
//     creation_date: string
//     documento: string
// }

// export class User {
//     "sub":string
//     "name":string
//     "rol":string
// }

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

export type categoryRaw = {
    id: number
    name: string
    position: number
    icon: string
    base_id: number
    parent_id: number
    es_id: string
}