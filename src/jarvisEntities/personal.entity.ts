import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";  
import { datosPersonales } from "./datosGenerales.entity";

@Entity('dp_distribucion_personal')
export class Personal {

    @PrimaryGeneratedColumn()
    id_dp_distribucion_personal: number;

    @Column()
    documento: string;

    @Column()
    codigo_sap: number;

    @Column({ type: "date" })
    fecha_actual: string;
    
    @Column()
    cod_pcrc: string;

    @Column()
    id_dp_centros_costos: number;

    @Column()
    id_dp_centros_costos_adm: number;

    @Column()
    documento_jefe: string;

    @Column()
    documento_responsable: string;

    @Column()
    tipo_distribucion: string;

    @Column()
    unidad_organizativa: string;

    @Column({ type: "datetime" })
    fecha_conex_ultimo_pcrc: string;

    @Column()
    id_dp_cargos: number;

    @Column()
    id_dp_estados: number;

    @OneToOne(type => datosPersonales)
    @JoinColumn({ referencedColumnName:'id_dp_datos_generales', name:'id_dp_datos_generales' })
    id_dp_datos_generales: number;

    @Column()
    documento_modificacion: string;
        
    @Column({ type: "datetime" })
    fecha_modificacion: string;
}