import { DbService } from "../databases/db.service";
export declare class ReportsModelService {
    private db;
    private s3Client;
    constructor(db: DbService);
    getReportLecturaLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportComentarioLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportBaseDatosLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportCambioLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportUsuarioLimit(idpcrc: any, limite: any, pag: any): Promise<any>;
    getReportFinancieraLimit(ini: any, fin: any): Promise<any>;
    getReportObligatorioLimit(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any, limite: any, pag: any): Promise<any>;
    getReportLecturaCategoriaLimit(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<any>;
    getReportBaseDatosCategoriaLimit(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<any>;
    getReportComentariocategoriaLimit(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<any>;
    getReportCambioCategoriaLimit(ini: any, fin: any, id: any, limite: any, pag: any): Promise<any>;
    getReportObligatorioCategoriaLimit(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any, limite: any, pag: any, idcategoria: any): Promise<any>;
    getReportLecturaPcrc(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getLecturaTotal(ini: any, fin: any, idpcrc: any): Promise<{
        total_lecturas: any;
        total_exportar: any[];
    }>;
    getLecturaCategoria(ini: any, fin: any, idcategoria: any): Promise<{
        total_lecturas: any;
        total_exportar: any[];
    }>;
    getReportLecturaCategoria(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<unknown[]>;
    getReportComentarioPcrc(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getReportComentarioCategoria(ini: any, fin: any, idcategoria: any, limite: any, pag: any): Promise<unknown[]>;
    getComentarioTotal(ini: any, fin: any, idpcrc: any): Promise<{
        total_comentario: any;
        total_exportar: any[];
    }>;
    getComentarioCategoriaTotal(ini: any, fin: any, idcategoria: any): Promise<{
        total_comentario: any;
        total_exportar: any[];
    }>;
    getReportBaseDatosPcrc(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getReportBaseDatosCategoria(ini: any, fin: any, categoria: any, limite: any, pag: any): Promise<unknown[]>;
    getBaseDatosTotal(idpcrc: any): Promise<{
        total_base: any;
        total_exportar: any[];
    }>;
    getBaseDatosCategoriaTotal(idcategoria: any): Promise<{
        total_base: any;
        total_exportar: any[];
    }>;
    getReportCambioPcrc(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getReportCambioCategoria(ini: any, fin: any, categoria: any, limite: any, pag: any): Promise<unknown[]>;
    getCambioTotal(ini: any, fin: any, idpcrc: any): Promise<{
        total_cambio: any;
        total_exportar: any[];
    }>;
    getCambioCategoriaTotal(ini: any, fin: any, idcategoria: any): Promise<{
        total_cambio: any;
        total_exportar: any[];
    }>;
    getReportUsuarioPcrc(idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getUsuarioTotal(idpcrc: any): Promise<{
        total_usuario: any;
        total_exportar: any[];
    }>;
    Paginatotalexcel(total_exportar: any, limite: any): Promise<any[]>;
    Paginatotal(total_lecturas: any, limite: any): Promise<any>;
    getReportComments(base_id: any, categoria_id: any, ini: any, fin: any): Promise<unknown[]>;
    getReportCambio(idarticulo: any, ini: any, fin: any): Promise<unknown[]>;
    getReportCommentsLimit(base_id: any, categoria_id: any, ini: any, fin: any, limite: any, pag: any): Promise<unknown[]>;
    getReportBases(idarticulo: any): Promise<unknown[]>;
    getReportBasesCategory(idcategoria: any): Promise<unknown[]>;
    getReportBasesPcrc(idpcrc: any): Promise<unknown[]>;
    getReportBasesCategoryLimit(idcategoria: any, limite: any, pag: any): Promise<unknown[]>;
    getReportBasesPcrcLimit(idpcrc: any, limite: any, pag: any): Promise<unknown[]>;
    getReportLectura(ini: any, fin: any, idarticulo: any): Promise<unknown[]>;
    getReportLecturaData(ini: any, fin: any, idarticulo: any): Promise<unknown[]>;
    getReportUsuario(idpcrc: any): Promise<unknown[]>;
    getReportLecturaCategory(ini: any, fin: any, idarticulo: any): Promise<unknown[]>;
    getCommnetByPcrc(id: any, dateIni: any, dateFin: any): Promise<unknown[]>;
    getCommnetByPcrcLimit(id: any, dateIni: any, dateFin: any, limite: any, pag: any): Promise<unknown[]>;
    getCategoryById(id: any): Promise<unknown[]>;
    getTotalArticulo(): Promise<unknown[]>;
    getTotalArticuloLimit(limite: any, pag: any): Promise<unknown[]>;
    getTotalFinanciera(fechaini: any, fechafin: any): Promise<unknown[]>;
    getTotalFinancieraLimit(fechainit: any, fechafin: any, limite: any, pag: any): Promise<unknown[]>;
    generaExcel(data: Array<any>, tipo: number, name: any): Promise<any>;
    uploadS3(url: any, name: any, type: any): Promise<any>;
    deleteReport(id: any): Promise<{
        message: string;
    }>;
    depurarReporte(): Promise<boolean>;
    getReportObligatorioPcrc(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any, limite: any, pag: any): Promise<any>;
    getObligatorioTotal(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any): Promise<{
        total_obligatorio: any;
        total_exportar: any[];
    }>;
    getObligatorioCategoria(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any, limite: any, pag: any, idcategoria: any): Promise<any>;
    getObligatorioCategoriaTotal(idpcrc: any, fechaini: any, fechafinal: any, usuarios: any, idcategoria: any): Promise<{
        total_obligatorio: any;
        total_exportar: any[];
    }>;
}
