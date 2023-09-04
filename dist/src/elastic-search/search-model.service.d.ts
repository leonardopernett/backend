import { SearchsIndex, search } from "./searchIndex";
import { ArticuloIndex } from "../articulos/articuloIndex";
import { DbService } from "../databases/db.service";
export declare class newSearchDTO {
    query: any;
    subline: any;
}
export declare class SearchModelService {
    private searchsIndex;
    private articleIndex;
    private db;
    constructor(searchsIndex: SearchsIndex, articleIndex: ArticuloIndex, db: DbService);
    newSearch(query: string, subline: string, userId: string): Promise<any>;
    getSuggestions(input: string, subline: string): Promise<string[]>;
    getDidYouMean(input: string): Promise<string>;
    getAll(): Promise<(search & {
        id: string;
    })[]>;
    getBySubline(subline: string): Promise<(search & {
        id: string;
    })[]>;
}
