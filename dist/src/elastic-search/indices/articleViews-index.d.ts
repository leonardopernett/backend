import { Esindex } from "../esindex";
export declare class articleView {
    initialDate: number;
    finalDate: number;
    articulo: string;
    duration: number;
    user: string;
    cliente: string;
    pcrc: string;
    categoria: string;
    director: string;
    gerente: string;
    coordinador: string;
    lider: string;
}
export declare class ArticlesViewsIndex extends Esindex<articleView> {
    constructor();
}
