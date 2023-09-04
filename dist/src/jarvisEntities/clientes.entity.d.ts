import { Pcrc } from "./pcrc.entity";
export declare class Clientes {
    id_dp_clientes: number;
    cliente: string;
    tipo_industria: string;
    estado: number;
    pcrcs: Pcrc[];
    centros: Pcrc[];
}
