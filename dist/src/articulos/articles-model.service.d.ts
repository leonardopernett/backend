import { ArticuloIndex } from "./articuloIndex";
import { CategoriesModelService } from '../categorias/categories-model.service';
import { S3BucketService } from '../s3/s3-bucket.service';
import { DbService } from "../databases/db.service";
import { articuloRaw, archivoRaw } from "./entities";
export declare class articleDTO {
    title: string;
    content: string;
    obj: string;
    tags: string[];
    state: string;
    category: string;
    done: Boolean;
}
export declare class updateArticleDTO {
    title: string;
    content: string;
    obj: string;
    tags: string[];
    state: number;
}
export declare class articleViewsDTO {
    initialDate: number;
    finalDate: number;
}
export declare class ArticlesModelService {
    private db;
    private articuloIndex;
    private categoriesModel;
    private S3BucketService;
    constructor(db: DbService, articuloIndex: ArticuloIndex, categoriesModel: CategoriesModelService, S3BucketService: S3BucketService);
    createArticuloIndex: () => Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, unknown>>;
    deleteArticuloIndex: () => Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, unknown>>;
    getArticlesByCategory(category: string, state?: string, from?: string, size?: string): Promise<articuloRaw[]>;
    getArticlePopular(vectorids: string): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    getArticlesByQuery(query: string, group: any, state?: string, from?: string, size?: string): Promise<unknown[]>;
    getArticlesByTag(options: {
        tag: string;
        subline: string;
        from?: string;
        size?: string;
    }): Promise<articuloRaw[]>;
    getArticlesByView: (pcrcId: string, from?: string, size?: string) => Promise<articuloRaw[]>;
    getArticlesByUpdate: (pcrcId: string, from?: string, size?: string) => Promise<articuloRaw[]>;
    getArticlesByRequired: (pcrcId: any, documento: any, from: 0, size: 10) => Promise<any[]>;
    totalarticlerequired: (pcrcId: any, documento: any) => Promise<unknown[]>;
    getArticle(articleId: string): Promise<{
        tags: string[];
        attached: string[];
        id: number;
        title: string;
        content: string;
        obj: string;
        state: string;
        categoria_id: number;
        type: string;
        likes: number;
        dislikes: number;
        favorites: number;
        vistas: number;
        es_id: string;
        base_id: string;
        cliente_id?: number;
    } | {
        id: number;
        title: string;
        content: string;
        obj: string;
        state: string;
        categoria_id: number;
        type: string;
        likes: number;
        dislikes: number;
        favorites: number;
        vistas: number;
        es_id: string;
        base_id: string;
        cliente_id?: number;
    }>;
    createArticle(article: any, creator_id: string): Promise<articuloRaw>;
    creararticlerequired(idarticulo: any, idpcrc: any, fechainicial: any, fechafinal: any, title: any, active: any): Promise<any>;
    viewarticlerequired(id_articulo: any, cedula: any): Promise<void>;
    validarCuestionario(id_articulo: any, cedula: any): Promise<[import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[], import("mysql2").FieldPacket[]]>;
    guardarCuestionario(id_articulo: any, cedula: any): Promise<void>;
    verifyrequired(articleId: any, cedula: any): Promise<boolean>;
    verifyrequiredfecha(articleId: any): Promise<boolean>;
    active(articleId: any, cedula: any): Promise<any>;
    verifyrequiredjarvis(cedula: any): Promise<any>;
    verifyarticlejarvis(idarticulo: any): Promise<any>;
    tablaobligatorios(): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    editarperiodo(inicial: any, final: any, titulo: any, id: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    buscararticulo(buscar: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    actualizarValoraciones(articleId: string, id_usuario: string, tipoValoracion: 'like' | 'disLike'): Promise<{
        likes: number;
        dislikes: number;
    }>;
    addFavorite(articleId: string, id_usuario: string): Promise<any>;
    deleteArticle: (id: string, userId: any, username?: string) => Promise<any>;
    updateArticle: (id: string, article: updateArticleDTO, modificationUser_id: string) => Promise<any>;
    addArticleView: (articleId: string, initialDate: number, finalDate: number, userId: string) => Promise<{
        vistas: any;
    }>;
    prueba(): Promise<any>;
    updateArticleImages(articleId: string, quillJsObj: any): Promise<string>;
    compareDeletedImages(articleId: string, newQuillsObj: string, oldQuillObj: string): Promise<void>;
    deleteArticleImagenes(quillJsObj: string): Promise<void>;
    uploadFile: (idArticle: string, file: any) => Promise<{
        file: any;
    }>;
    getArticuloFiles: (idArticulo: string) => Promise<archivoRaw[]>;
    getCliente(): Promise<unknown[]>;
    getMultipleUser(pcrc: any): Promise<unknown[]>;
    getPcrc(pcrc: any): Promise<unknown[]>;
    getObligatorioEdit(id: any): Promise<unknown[]>;
    getObligatorioPreguntas(id: any): Promise<unknown[]>;
    guardarResultado(id_articulo: any, cedula: any, respuestas: any): Promise<void>;
    validarRespuestas(respuestas: any): Promise<1 | 0>;
    guardarPreguntas(idobligatorio: any, preguntas: any, respuestas: any): Promise<void>;
    resultadosCuestionario(fechaini: any, fechafin: any, idpcrc: any, limite: any, page: any): Promise<unknown[]>;
    resultadoscategoriaCuestionario(fechaini: any, fechafin: any, idcategoria: any, limite: any, page: any): Promise<unknown[]>;
    CuestionarioTotal(idpcrc: any, fechaini: any, fechafin: any): Promise<{
        total_cuestionarios: any;
        total_exportar: any[];
    }>;
    CuestionariocategoriaTotal(idcategoria: any, fechaini: any, fechafin: any): Promise<{
        total_cuestionarios: any;
        total_exportar: any[];
    }>;
    Paginatotalexcel(total_exportar: any, limite: any): Promise<any[]>;
    Paginatotal(total_lecturas: any, limite: any): Promise<any>;
    getReportCuestionarioLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportCuestionariocategoriaLimit(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<any>;
    habilitarobligatorio(idarticulo: any): Promise<void>;
    cambiararticulo(articulo_id: any, base: any, categoria: any): Promise<void>;
    validarcaptcha(): Promise<unknown[]>;
    validarbusqueda(): Promise<unknown[]>;
    accioncaptcha(captcha: any): Promise<void>;
    accionbusqueda(busqueda: any): Promise<void>;
    guardarpcrcautomatizado(origen: any, destino: any): void;
    eliminarpcrcautomatizado(id: any): void;
}
