import { Injectable, UnauthorizedException, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from 'src/utils/mailer.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailOptions } from 'nodemailer/lib/json-transport';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, private readonly jwt: JwtService, private readonly mailerService: MailerService
    ) { }
    async loginUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto
        const user = await this.prisma.profile.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException("invalid email or password");
        if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException("invalid email or password")
        // generate token
        const token = this.jwt.sign({ sub: { id: user.id } }, { expiresIn: '1d', secret: process.env.SECRET })
        return { msg: 'login succeeded', token }
    }
    async resetPasswordDemand(resetPasswordDto: ResetPasswordDto) {
        const user = await this.prisma.profile.findUnique({ where: { email: resetPasswordDto.email } });
        if (!user) throw new NotFoundException("invalid email");
        const etoken = this.jwt.sign({ sub: { email: user.email } }, { expiresIn: '15m', secret: process.env.RESET })
        try {
            const mailOptions: MailOptions = {
                from: "RESET PASSWORD",
                to: user.email,
                subject: "RESET PASSWORD DEMAND",
                html: `reset your password <a href="http://localhost:3000/reset-change?t=${etoken}">here</a>`
            }
            const inf = this.mailerService.sendMail(mailOptions);
            if (inf.status === -1) throw new HttpException(inf.err || 'unkonwn server error', 500);
            return { msg: 'email sent successfully' }
        }
        catch (err) {
            throw new HttpException(err || "unknown server error", 500)
        }
    }
    async isValidReset(token: string) {
        if (!token) throw new UnauthorizedException("invalid or expired token")
        try {
            await this.jwt.verifyAsync(token, { secret: process.env.RESET });
            return { msg: 'valid-reset' }

        }
        catch {
            throw new UnauthorizedException('invalid or expired token')
        }
    }
    async changeUserPassword(changePasswordDto: ChangePasswordDto, req) {
        if (changePasswordDto.password !== changePasswordDto.confirm) throw new BadRequestException("password doen't match")
        try {
            await this.prisma.profile.update(
                {
                    where: { email: req.userEmail },
                    data: { password: bcrypt.hashSync(changePasswordDto.password, 12) }
                }
            )
            return { msg: "password changed successfully" }
        }
        catch (err) {
            throw new HttpException(err || "unknown server error", 500);
        }
    }
}
