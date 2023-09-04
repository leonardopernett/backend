export declare type perfil = {
    id: number;
    nombre: string;
};
export declare type permiso = {
    id: number;
    perfil_id: number;
    accion_id: number;
    objeto: string;
};
