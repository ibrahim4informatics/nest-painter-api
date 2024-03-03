import { IsString, IsNotEmpty, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string


    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    confirm: string
}