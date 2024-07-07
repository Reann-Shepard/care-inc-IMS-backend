import { Test, TestingModule } from '@nestjs/testing';
import { OrderManufacturerController } from './order-manufacturer.controller';

describe('OrderManufacturerController', () => {
  let controller: OrderManufacturerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderManufacturerController],
    }).compile();

    controller = module.get<OrderManufacturerController>(
      OrderManufacturerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
