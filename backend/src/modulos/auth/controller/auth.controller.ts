import { Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/input/login.dto";

// /api/v1/auth/logn
@Controller("auth")
export class AuthController{

    @Post("")
    async login(@Body() dto: LoginDto): Promise<{accessToken: string}>{

        // Al no tener implementado el metodo todavia, no se necesita el tipo de retorno.
        throw new NotImplementedException();
        
    }


}