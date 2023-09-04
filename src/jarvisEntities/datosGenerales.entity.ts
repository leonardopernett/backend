import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('dp_datos_generales')
export class datosPersonales {

    @PrimaryGeneratedColumn()
    id_dp_datos_generales: number;

    @Column()
    id_dp_solicitudes: number;

    @Column()
    documento: string;

    @Column()
    nombre_completo: string;

    @Column()
    primer_nombre: string;

    @Column()
    segundo_nombre: string;
    
    @Column()
    primer_apellido: string;
    
    @Column()
    segundo_apellido: string;
    
    @Column()
    id_departamento_origen: number;
    
    @Column()
    id_ciudad_origen: number;
    
    @Column()
    id_dp_nacionalidad: number;
    
    @Column()
    id_dp_pais: number;
    
    @Column()
    id_dp_idioma_nativo: number;
    
    @Column()
    id_dp_genero: number;
    
    @Column()
    id_gh_eps: number;
    
    @Column()
    id_dp_arl: number;
    
    @Column()
    id_dp_fondo_pensiones: number;
    
    @Column()
    id_dp_fondo_cesantias: number;
    
    @Column()
    id_dp_caja_compensacion: number;
    
    @Column({ type: "date" })
    fecha_nacimiento: string;

    @Column()
    id_dp_sede: number;

    @Column()
    id_dp_disponibilidad_lv: number;

    @Column()
    id_dp_disponibilidad_s: number;

    @Column()
    id_dp_disponibilidad_df: number;

    @Column()
    id_dp_sub_personal: number;

    @Column()
    id_dp_ceco_nomina: number;

    @Column()
    id_dp_ceco_nomina2: number;

    @Column()
    id_dp_tipo_vinculacion: number;

    @Column({ type: "date" })
    fecha_alta_distribucion: string;

    @Column({ type: "date" })
    fecha_alta: string;

    @Column({ type: "date" })
    fecha_ingreso: string;

    @Column()
    id_dp_tipo_documento: number;

    @Column({type:'enum'})
    aplica_teletrabajo: number;

    @Column({type:'enum'})
    estado_condicion_medica: number;

    @Column({type:'tinyint'})
    contratacion: number;

    @Column({type:'tinyint'})
    compensacion: number;

    @Column()
    documento_profesional: string;

}