import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Clientes } from "./clientes.entity";
import { Pcrc } from "./pcrc.entity";

@Entity('dp_centros_costos')
export class CentrosCostos {

    @PrimaryGeneratedColumn()
    id_dp_centros_costos: number;

    @Column()
    centros_costos: string;

    @Column()
    nomina: string;

    @Column()
    director_programa: string;

    @Column()
    documento_director: string;

    @Column()
    gerente_cuenta: string;

    @Column()
    documento_gerente: string;

    @Column()
    tipo_cliente: string;

    @Column()
    ciudad: string;

    @Column()
    codigo_contrato: string;

    @Column()
    afecta_mc: number;

    @Column()
    estado: number;

    @ManyToOne(type => Clientes, cliente => cliente.centros)
    @JoinColumn({name:'id_dp_clientes'})
    id_dp_clientes: string;

    @Column()
    id_dp_servicio: string;

    @Column()
    id_dp_programa: string;

    @OneToMany(type => Pcrc, pcrc => pcrc.id_dp_centros_costos)
    @JoinColumn({referencedColumnName:'id_dp_centros_costos'})
    pcrcs:Pcrc[]
}