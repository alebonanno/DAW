import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    // "!" => Le dice que ignore que este vacia.
    nombre!: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    clave!: string
}