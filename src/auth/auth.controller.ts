
import { Controller, Post, Body, Query, Get, ParseIntPipe, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }


    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto)
    }


    // demand for reset password
    @Post('reset')
    userResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPasswordDemand(resetPasswordDto)
    }

    // check if there is an reset password

    @Get('isvalid-reset')
    isValidReset(@Query('t') token: string) {
        return this.authService.isValidReset(token);
    }


    // change the password
    @Post('reset-change')
    changeUserPassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
        return this.authService.changeUserPassword(changePasswordDto, req)
    }



}
