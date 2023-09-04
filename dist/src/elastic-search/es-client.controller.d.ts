import { EsClientService } from "./es-client.service";
export declare class EsClientController {
    private EsClientService;
    constructor(EsClientService: EsClientService);
    createIndex(indice: any): any;
    deleteIndex(indice: any): any;
}
