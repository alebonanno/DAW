import { ApiProperty } from "@nestjs/swagger";
import { EstadosClientesEnum } from "../../enums/estados-clientes.enum";

export class ListClienteDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: EstadosClientesEnum;

    @ApiProperty()
    telefono?: string;

    @ApiProperty()
    email?: string;

    // Extra4
    @ApiProperty({ example: "2026-04-30T13:51:52.728Z" })
    createdAt?: Date;

}