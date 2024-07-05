import { Test, TestingModule } from '@nestjs/testing';
import { RepairController } from './repair.controller';

describe('RepairController', () => {
  let controller: RepairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairController],
    }).compile();

    controller = module.get<RepairController>(RepairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
