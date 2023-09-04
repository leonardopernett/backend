import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export class category {
    pcrc: string;
    name: string;
    position: number;
    icon: string;
    group: string;
}

@Injectable()
export class CategoriesIndex extends Esindex<category> {
    constructor(){
        super('categories', process.env.ES_PUNTO_ENLACE)
    }

}