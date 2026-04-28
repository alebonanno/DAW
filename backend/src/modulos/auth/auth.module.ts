import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthGuard } from "./guards/auth.guard";
import { UsuariosService } from "./services/usuarios.service";
import { AuthService } from "./services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Usuario } from "./entitites/usuario.entity";

@Module({
    controllers:[AuthController],
    providers:[UsuariosService, AuthService, AuthGuard],
    imports: [TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        global: true,
        useFactory: (configService: ConfigService) => {
            return {
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '8h' },
            }
        },
    })
    ,],
    exports: [AuthGuard]
})
export class AuthModule {
    
}