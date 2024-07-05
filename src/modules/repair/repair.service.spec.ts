import { Test, TestingModule } from '@nestjs/testing';
import { RepairService } from './repair.service';

describe('RepairService', () => {
  let service: RepairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairService],
    }).compile();

    service = module.get<RepairService>(RepairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
