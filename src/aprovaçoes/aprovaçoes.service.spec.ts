import { Test, TestingModule } from '@nestjs/testing';
import { AprovaçoesService } from './aprovaçoes.service';

describe('AprovaçoesService', () => {
  let service: AprovaçoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AprovaçoesService],
    }).compile();

    service = module.get<AprovaçoesService>(AprovaçoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
