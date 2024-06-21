import { Test, TestingModule } from '@nestjs/testing';
import { OrderCustomerService } from './orderCustomer.service';

describe('OrderCustomerService', () => {
  let service: OrderCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCustomerService],
    }).compile();

    service = module.get<OrderCustomerService>(OrderCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
