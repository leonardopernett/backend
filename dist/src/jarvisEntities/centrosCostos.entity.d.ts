import { Pcrc } from "./pcrc.entity";
export declare class CentrosCostos {
    id_dp_centros_costos: number;
    centros_costos: string;
    nomina: string;
    director_programa: string;
    documento_director: string;
    gerente_cuenta: string;
    documento_gerente: string;
    tipo_cliente: string;
    ciudad: string;
    codigo_contrato: string;
    afecta_mc: number;
    estado: number;
    id_dp_clientes: string;
    id_dp_servicio: string;
    id_dp_programa: string;
    pcrcs: Pcrc[];
}
