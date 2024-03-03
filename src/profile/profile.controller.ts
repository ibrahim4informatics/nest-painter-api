import { Controller, Get, Patch, UseGuards, Body, Request, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    getProfile() {
        return this.profileService.getProfile();
    }

    @Patch()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('picture'))
    updateProfile(@Body() updateUserDto: UpdateUserDto, @UploadedFile() file:Express.Multer.File ,@Request() req: any) {
        return this.profileService.UpdateProfile(updateUserDto, req.userId, file)
    }
}
