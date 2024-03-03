import { Module } from '@nestjs/common';
import { PaintController } from './paint.controller';
import { PaintService } from './paint.service';

@Module({
  controllers: [PaintController],
  providers: [PaintService]
})
export class PaintModule {}
