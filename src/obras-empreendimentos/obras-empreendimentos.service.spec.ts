import { Test, TestingModule } from '@nestjs/testing';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';

describe('ObrasEmpreendimentosService', () => {
  let service: ObrasEmpreendimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObrasEmpreendimentosService],
    }).compile();

    service = module.get<ObrasEmpreendimentosService>(ObrasEmpreendimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
