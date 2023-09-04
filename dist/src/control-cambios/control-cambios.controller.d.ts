import { ControlCambiosModelService } from '../control-cambios/control-cambios.service';
export declare class ControlCambiosController {
    private control;
    constructor(control: ControlCambiosModelService);
    mostrarControlcambio(body: any): any;
    mostrarCambio(body: any): any;
    selectCambio(body: any): any;
}
