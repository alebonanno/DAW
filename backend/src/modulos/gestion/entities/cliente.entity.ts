import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum";
import { Proyecto } from "./proyecto.entity";

@Entity({ name: "clientes" })
export class Cliente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    // Extra
    // nullable: true => No todos los clientes tienen telefono o email.
    @Column({ nullable: true })
    telefono?: string;

    // Extra
    @Column({ nullable: true })
    email?: string;

    @Column({ type: 'enum', enum: EstadosClientesEnum })
    estado!: EstadosClientesEnum

    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos!: Proyecto[]

    //Extra4
    @CreateDateColumn()
    // Fecha automática en la que se crea el cliente en la base de datos.
    // Se usa para filtrar clientes por rango de fechas (desde / hasta).
    createdAt!: Date;

}