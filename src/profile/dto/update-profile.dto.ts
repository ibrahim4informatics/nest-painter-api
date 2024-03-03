import { IsEmail, IsStrongPassword, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email?: string


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    first_name?: string


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    last_name?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    confirm?: string
}