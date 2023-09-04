import { ApiResponse, Client } from "@elastic/elasticsearch";
declare type aggsType = 'sum' | 'avg';
export declare class Esindex<T> {
    protected index: string;
    constructor(index: string, enlace: string, accesKey_id?: string, accesKey?: string);
    protected readonly esClient: Client;
    private createBody;
    protected createRequest: (x: any) => {
        body: unknown;
    } & {
        index: string;
    };
    create: (doc: T, id?: string) => Promise<T & {
        id: string;
    }>;
    getById: (id: string) => Promise<T & {
        id: string;
    }>;
    query: (query: object) => Promise<(T & {
        id: string;
    })[]>;
    where: (ops: { [P in keyof T]?: any; }, from?: string, size?: string, order?: {
        orderby: keyof T;
        order: 'asc' | 'desc';
    }) => Promise<(T & {
        id: string;
    })[]>;
    deleteWhere: (ops: Partial<T>) => Promise<{
        deleted: number;
    }>;
    deleteByQuery: (query: object) => Promise<{
        deleted: number;
    }>;
    delete: (id: string) => Promise<any>;
    all: () => Promise<(T & {
        id: string;
    })[]>;
    updateScript: (id: string, script: object) => Promise<any>;
    updatePartialDocument: (id: string, partial: Partial<T>) => Promise<any>;
    aggsWhere: (ops: { [P in keyof T]?: any; }, aggs: {
        op: aggsType;
        field: keyof T;
    }) => Promise<number>;
    count: (query: object) => Promise<number>;
    createIndex: (body: any) => Promise<ApiResponse<Record<string, any>, unknown>>;
    deleteIndex: () => Promise<ApiResponse<Record<string, any>, unknown>>;
}
export {};
