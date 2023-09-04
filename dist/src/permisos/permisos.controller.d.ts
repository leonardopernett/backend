import { PermisionsModelService, permisoDTO } from "./permisions-model.service";
export declare class PermisosController {
    private permisionsModel;
    constructor(permisionsModel: PermisionsModelService);
    deletePermiso(idPermiso: string): Promise<unknown[]>;
    updatePermiso(idPermiso: string, permisoDTO: permisoDTO): Promise<unknown[]>;
}
