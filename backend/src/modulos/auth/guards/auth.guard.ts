import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    // Inyecta el servicio para manejar JWT.
    constructor(private jwtService: JwtService) { }

    // Este método se ejecuta antes de entrar a cualquier endpoint protegido.
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Obtiene la request HTTP.
        const request = context.switchToHttp().getRequest();

        // Extrae el token del header Authorization.
        const token = this.extractTokenFromHeader(request);

        // Si no hay token => Acceso denegado (401).
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // Verifica que el token sea valido.
            const payload = await this.jwtService.verifyAsync(token);
            // Guarda los datos del usuario en la request.
            request['usuario'] = payload;
        } catch {
            // Si el token es inválido o expiró => (401).
            throw new UnauthorizedException();
        }
        // Si todo esta bien, permite el acceso.
        return true;
    }

    // Método para sacar el token del header: Authorization: Bearer <token>.
    private extractTokenFromHeader(request: Request): string | undefined {
        // Divide el header en tipo y token.
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        // Solo acepta formato 'Bearer <token>'.
        return type === 'Bearer' ? token : undefined;
    }
}