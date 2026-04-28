import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";
import { EstadosClientesEnum } from "../../enums/estados-clientes.enum";

// "PartialType" => Extiende de la clase "CreateClienteDto", pero vuelve opcionales sus propiedades.
// Todo lo hereda "UpdateClienteDto", y se agrega el campo "estado!" de forma manual.
export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @ApiProperty({ enum: EstadosClientesEnum, example: EstadosClientesEnum.ACTIVO })
    @IsEnum(EstadosClientesEnum)
    @IsOptional()
    estado!: EstadosClientesEnum;

}