import { Test, TestingModule } from '@nestjs/testing';
import { OrderCustomerController } from './orderCustomer.controller';

describe('OrderCustomerController', () => {
  let controller: OrderCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCustomerController],
    }).compile();

    controller = module.get<OrderCustomerController>(OrderCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
