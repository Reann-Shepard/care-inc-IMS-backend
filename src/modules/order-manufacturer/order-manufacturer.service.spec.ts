import { Test, TestingModule } from '@nestjs/testing';
import { OrderManufacturerService } from './order-manufacturer.service';

describe('OrderManufacturerService', () => {
  let service: OrderManufacturerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderManufacturerService],
    }).compile();

    service = module.get<OrderManufacturerService>(OrderManufacturerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
