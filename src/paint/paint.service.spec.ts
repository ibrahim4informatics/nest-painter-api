import { Test, TestingModule } from '@nestjs/testing';
import { PaintService } from './paint.service';

describe('PaintService', () => {
  let service: PaintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaintService],
    }).compile();

    service = module.get<PaintService>(PaintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
