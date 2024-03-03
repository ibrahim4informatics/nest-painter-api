import { BadRequestException, Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateUserDto } from './dto/update-profile.dto';
import { FirebaseImageService } from 'src/utils/firebase-image.service';
@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService, private readonly firebaseImageService: FirebaseImageService) { }
    async getProfile() {
        const profile = await this.prisma.profile.findFirst();
        const { first_name, last_name, email, picture_url } = profile;
        return { profile: { first_name, last_name, email, picture_url } };
    }
    async UpdateProfile(updateUserDto: UpdateUserDto, userId: string, file: Express.Multer.File) {
        const { first_name, last_name, password, confirm, email } = updateUserDto;
        let picture_url: string | undefined = undefined;
        if (!email && (!password && !confirm) && !first_name && !last_name && !file) throw new BadRequestException("nothing to update");
        if ((password && confirm) && (password !== confirm)) throw new BadRequestException("passwords doen't matche");
        if (file) {

            try {
                const fileName = `${Date.now() * Math.floor(Math.random() * 10 ** 9)}.${file.mimetype.split('/')[1]}`;
                picture_url = await this.firebaseImageService.uploadFile(file, `profile/${fileName}`)
            }

            catch (err) {
                throw new HttpException(err || 'unknown server error', 500);
            }

        }
        try {
            await this.prisma.profile.update({ where: { id: userId }, data: { ...updateUserDto, picture_url: picture_url } })
            return { msg: `user ${userId} updated successfully` }
        }

        catch (err) {
            throw new HttpException(err || 'unknowns server error', 500);
        }
    }
}
