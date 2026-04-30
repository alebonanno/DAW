import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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


    // Extra.
    @ApiProperty({
        example: "+544224455",
        description: "Telefono del cliente que se va a crear",
    })
    @IsOptional()
    @IsString()
    telefono?: string;

    @ApiProperty({
        example: "example@gmail.com",
        description: "Email del cliente que se va a crear",
    })
    @IsOptional()
    @IsEmail()
    email?: string;
}