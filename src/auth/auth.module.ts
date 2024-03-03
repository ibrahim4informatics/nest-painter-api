import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CheckReset } from 'src/midlewares/check_reset.midleware';
import { MailerService } from 'src/utils/mailer.service';





@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, { provide: 'RESET_JWT', useExisting: JwtService }, MailerService],
  controllers: [AuthController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckReset).forRoutes('/auth/reset-change')
  }
}
