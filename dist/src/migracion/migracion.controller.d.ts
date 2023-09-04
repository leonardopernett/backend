import { MigracionModelService } from "./migracion-model.service";
export declare class MigracionController {
    private migracionModel;
    constructor(migracionModel: MigracionModelService);
    migrarUsuarios(from: number, size: number): Promise<unknown[]>;
    migrarUsuariosBases(from: number, size: number): Promise<void>;
    migrarCategorias(from: number, size: number): Promise<unknown[]>;
    migrarArticulo(from: number, size: number): Promise<unknown[]>;
    migrarVistasArticulo(from: number, size: number): Promise<unknown[]>;
    migrarComentariosArticulo(from: number, size: number): Promise<void>;
    migrarFavoritos(from: number, size: number): Promise<void>;
    migrarMeGusta(from: number, size: number): Promise<void>;
    arreglarArticulos(from: number, size: number): Promise<unknown[]>;
    arreglarCategorias(from: number, size: number): Promise<unknown[]>;
    arreglarUsuarios(from: number, size: number): Promise<unknown[]>;
    buscararticulos(from: number, size: number): Promise<unknown[]>;
}
