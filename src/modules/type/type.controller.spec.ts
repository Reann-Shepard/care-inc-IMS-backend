import { Test, TestingModule } from '@nestjs/testing';
import { TypeController } from './type.controller';

describe('TypeController', () => {
  let controller: TypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
    }).compile();

    controller = module.get<TypeController>(TypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
