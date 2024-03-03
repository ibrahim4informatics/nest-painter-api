import { Inject, Injectable, NestMiddleware, Request, UnauthorizedException } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class CheckReset implements NestMiddleware {
    constructor(@Inject("RESET_JWT") private readonly jwtService: JwtService) { }
    async use(@Request() req, _res: Response, next: NextFunction) {

        const token = req.query.t;
        if (!token) throw new UnauthorizedException("invalid or expired token");
        try {

            const payload = await this.jwtService.verifyAsync(token.toString(), { secret: process.env.RESET });
            req.userEmail = payload.sub.email;
            next();
        }
        catch {
            throw new UnauthorizedException("invalid or expired token");
        }

    }
}