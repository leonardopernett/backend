import { Esindex } from "../esindex";
import { Injectable } from "@nestjs/common";

export class articleView {
    initialDate:number;
    finalDate:number;
    articulo:string;
    duration:number;
    user:string;
    cliente:string;
    pcrc:string;
    categoria:string;
    director:string;
    gerente:string;
    coordinador:string;
    lider:string;
}

@Injectable()
export class ArticlesViewsIndex extends Esindex<articleView> {

    constructor(){
        super('views', process.env.ES_PUNTO_ENLACE)
    }

}