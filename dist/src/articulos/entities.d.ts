export declare type articuloRaw = {
    id: number;
    title: string;
    content: string;
    obj: string;
    state: string;
    categoria_id: number;
    type: string;
    likes: number;
    dislikes: number;
    favorites: number;
    vistas: number;
    es_id: string;
    base_id: string;
    cliente_id?: number;
};
export declare type archivoRaw = {
    id: number;
    file_name: string;
    articulo_id: number;
};
export declare type valoracionRaw = {
    id: number;
    tipo_valoracion: string;
    creation_date: string;
    articulo_id: string;
    usuario_id: string;
};
