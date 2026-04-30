import { Test, TestingModule } from '@nestjs/testing';
import { NotasFiscaisService } from './notas-fiscais.service';

describe('NotasFiscaisService', () => {
  let service: NotasFiscaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotasFiscaisService],
    }).compile();

    service = module.get<NotasFiscaisService>(NotasFiscaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
