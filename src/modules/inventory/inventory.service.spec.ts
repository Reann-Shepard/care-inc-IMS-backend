import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let prisma: PrismaService;

  const mockAlteration = {
    repair: {
      groupBy: jest
        .fn()
        .mockResolvedValue([
          { manufacturerId: 1, _count: { manufacturerId: 3 } },
        ]),
    },
    manufacturer: {
      findUnique: jest.fn().mockResolvedValue({ name: 'Manufacturer A' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: PrismaService,
          useValue: mockAlteration,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return alteration count by manufacturer', async () => {
    const alterationCountByMfr = await service.getAlterationCountByMfr();
    expect(alterationCountByMfr).toEqual([
      { name: 'Manufacturer A', count: 3 },
    ]);
    expect(prisma.repair.groupBy).toHaveBeenCalledWith({
      by: ['manufacturerId'],
      _count: { manufacturerId: true },
    });
    expect(prisma.manufacturer.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
