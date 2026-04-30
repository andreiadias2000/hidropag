import { Test, TestingModule } from '@nestjs/testing';
import { ObrasEmpreendimentosController } from './obras-empreendimentos.controller';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';

describe('ObrasEmpreendimentosController', () => {
  let controller: ObrasEmpreendimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObrasEmpreendimentosController],
      providers: [ObrasEmpreendimentosService],
    }).compile();

    controller = module.get<ObrasEmpreendimentosController>(ObrasEmpreendimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
