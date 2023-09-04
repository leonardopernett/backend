import { DbService } from './databases/db.service';
export declare class Keys {
    private DB;
    constructor(DB: DbService);
    elastic(): Promise<any>;
}
