import { Esindex } from "../esindex";
export declare class category {
    pcrc: string;
    name: string;
    position: number;
    icon: string;
    group: string;
}
export declare class CategoriesIndex extends Esindex<category> {
    constructor();
}
