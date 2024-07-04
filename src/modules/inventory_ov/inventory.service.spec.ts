import { Test, TestingModule } from '@nestjs/testing';
import { InventoryOvService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryOvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryOvService],
    }).compile();

    service = module.get<InventoryOvService>(InventoryOvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
