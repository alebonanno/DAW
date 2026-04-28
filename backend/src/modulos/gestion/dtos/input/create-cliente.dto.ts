import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// 'CreateClienteDto' => define cómo llega la información al backend.
export class CreateClienteDto {

    // Lo muestra en 'Swagger'.
    @ApiProperty({
        example: "Rikka",
        description: "Nombre del cliente que se va a crear",
    })
    // Asegura que sea texto.
    @IsString({
        message: "El nombre debe ser un texto",
    })
    // Evita valores vacíos.
    @IsNotEmpty({
        message: "El nombre no puede estar vacío",
    })
    // Es el dato que envía el usuario
    nombre!: string;

}