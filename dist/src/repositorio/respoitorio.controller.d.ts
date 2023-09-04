import { User as U } from '../usuarios/entities';
import { RepositorioServices } from './repositorio.services';
import * as S3 from 'aws-sdk/clients/s3';
export declare class RepositorioController {
    private readonly respositoryService;
    s3Client: S3;
    constructor(respositoryService: RepositorioServices);
    uploadFile(body: any, image: any, res: any, idArticulo: any, User: U): Promise<any>;
    getRepositorioByArticuloId(res: any, IdArticulo: any): Promise<any>;
    getallFile(body: any, IdArticulo: any): void;
    deleteBorradorDocumento(id: any, res: any, User: U, body: any): Promise<any>;
}
