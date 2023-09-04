import { ApiResponse } from "@elastic/elasticsearch";
export declare class EsClientService {
    constructor();
    createIndex(index: string): Promise<ApiResponse>;
    deleteIndex(index: string): Promise<any>;
}
