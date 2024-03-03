import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtSercie: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const bearer_token = req.headers.authorization;
        if (!bearer_token) throw new UnauthorizedException("invalid or expired token");
        try {
            const payload = await this.jwtSercie.verifyAsync(this.extractToken(bearer_token), { secret: process.env.SECRET })
            req.userId = payload.sub.id
            return true
        }
        catch {

            throw new UnauthorizedException("invalid or expired token")
        }
    }
    private extractToken(brearer_token: string) {
        return brearer_token.split(' ')[1]
    }
}