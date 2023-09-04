import { Pool } from "mysql2/promise";
export declare class DbService {
    constructor();
    nikcleanPoolConection: Pool;
    private nikPoolConection;
    private nikSlavePoolConection;
    private jarvisPoolConection;
    NIK: <T>(sql: string, values?: string[]) => Promise<T[]>;
    JARVIS: <T>(sql: string, values?: string[]) => Promise<T[]>;
    NIKSLAVE: <T>(sql: string, values?: string[]) => Promise<T[]>;
}
