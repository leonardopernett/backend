import { Esindex } from "./esindex";
export interface search {
    query: any;
    subline: string;
    user: string;
    publicationDate: number;
    didyoumean: string;
}
export declare class SearchsIndex extends Esindex<search> {
    constructor();
    create: (doc: search, id?: string) => Promise<search & {
        id: string;
    }>;
    query: (query: object) => Promise<any>;
}
