import { Test, TestingModule } from '@nestjs/testing';
import { PaintController } from './paint.controller';

describe('PaintController', () => {
  let controller: PaintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaintController],
    }).compile();

    controller = module.get<PaintController>(PaintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
