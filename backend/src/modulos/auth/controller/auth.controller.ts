import { Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/input/login.dto";
import { AuthService } from "../services/auth.service";

// /api/v1/auth/logn
@Controller("auth")
export class AuthController{

    constructor(private readonly authService: AuthService){}

    @Post("")
    async login(@Body() dto: LoginDto): Promise<{accessToken: string}>{

        // Al no tener implementado el metodo todavia, no se necesita el tipo de retorno.
        return await this.authService.login(dto);
        
    }


}