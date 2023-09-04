import { DbService } from "../databases/db.service";
export declare class PreturnoModelService {
    private db;
    constructor(db: DbService);
    insertarpreturno(data: any): Promise<any>;
    notificarpreturno(tokencosmo: any, tipo: any, titulo: any, array: any): Promise<void>;
    asignarTokenCosmos(): Promise<any>;
    mostrarpreturnos(pcrc: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    mostrarpreturnosacargo(cedula: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    mostrarpreturnosadmin(cedula: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    borrarpreturno(idpreturno: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    actualizarpreturno(idpreturno: any, titulo: any, descripcion: any, contenido: any, fecha_inicial: any, fecha_final: any): Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
    guardarPreguntas(idobligatorio: any, preguntas: any, respuestas: any): Promise<void>;
    guardarConcepto(idpreturno: any, preguntas: any, respuestas: any): Promise<void>;
    guardarPreguntasUnicas(idpreturno: any, preguntas: any, respuestas: any): Promise<void>;
    validarPreturnoTotal(pcrc: any, cedula: any): Promise<number>;
    totalcargo(cedula: any): Promise<number>;
    obtenerPreguntasPreturno(id: any): Promise<unknown[]>;
    obtenerPreguntasPreturnoUnica(id: any): Promise<unknown[]>;
    obtenerPreguntasPreturnoConcepto(id: any): Promise<unknown[]>;
    obtenerRespuestaPreturnoConcepto(id: any): Promise<unknown[]>;
    guardarResultadoMultiple(id_preturno: any, cedula: any, porcentaje1: any, porcentaje2: any, porcentaje3: any): Promise<void>;
    guardarCuestionarioMultiple(id_preturno: any, cedula: any): Promise<void>;
    guardarCuestionarioUnico(id_preturno: any, cedula: any): Promise<void>;
    guardarCuestionarioConcepto(id_preturno: any, cedula: any): Promise<void>;
    validarRespuestasMultiple(respuestas: any): Promise<{
        validar: number;
        validas: any;
        total: any;
    }>;
    vistoMultiple(id_preturno: any, cedula: any): Promise<1 | 0>;
    vistoUnico(id_preturno: any, cedula: any): Promise<1 | 0>;
    vistoConcepto(id_preturno: any, cedula: any): Promise<1 | 0>;
    guardarVisto(id_preturno: any, cedula: any): Promise<void>;
    visto(id_preturno: any, cedula: any): Promise<1 | 0>;
    validadoOcultar(cedula: any, id_preturno: any): Promise<1 | 0>;
    avance(cedula: any, pcrc: any): Promise<number>;
    getReportPreturnoPcrc(pcrc: any, fechaini: any, fechafin: any, limite: any, page: any): Promise<any>;
    getPreturnoTotal(ini: any, fin: any, idpcrc: any): Promise<{
        total_preturno: any;
        total_exportar: any[];
    }>;
    getReportPreturnoLimit(ini: any, fin: any, idpcrc: any, limite: any, pag: any): Promise<any>;
    Paginatotalexcel(total_exportar: any, limite: any): Promise<any[]>;
    Paginatotal(total_lecturas: any, limite: any): Promise<any>;
    aprobacion(cedula: any): Promise<any>;
    personasAcargo(cedula: any): Promise<any>;
}
