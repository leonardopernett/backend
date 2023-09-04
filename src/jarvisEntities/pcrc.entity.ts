import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Clientes } from "./clientes.entity";
import { Personal } from "./personal.entity";
import { CentrosCostos } from "./centrosCostos.entity";

@Entity('dp_pcrc')
export class Pcrc {

    @PrimaryGeneratedColumn()
    id_dp_pcrc: number;

    @Column()
    pcrc: string;

    @Column()
    ciudad: string;

    @Column()
    estado: number;

    @Column()
    cod_pcrc: string;

    @Column()
    id_pcrc: number;

    @ManyToOne(type => CentrosCostos, centro => centro.pcrcs)
    @JoinColumn({name:'id_dp_centros_costos'})
    id_dp_centros_costos: number;

    @ManyToOne(type => Clientes, cliente => cliente.pcrcs)
    @JoinColumn({name:'id_dp_clientes'})
    id_dp_clientes: number;    
}