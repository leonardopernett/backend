export declare type userRaw = {
    id: number;
    user_name: string;
    creation_date: string;
    documento: string;
    rol: string;
    base_id: string;
    id_rol: number;
};
export declare type User = {
    sub: string;
    name: string;
    rol: string;
};
export declare type Sesion = {
    login: string;
    logout: string;
    usuario_id: string;
    base_id: string;
};
