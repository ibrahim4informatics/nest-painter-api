import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FirebaseImageService } from 'src/utils/firebase-image.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, JwtService, FirebaseImageService]
})
export class ProfileModule { }
