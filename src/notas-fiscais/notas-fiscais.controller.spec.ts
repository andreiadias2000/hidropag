import { Test, TestingModule } from '@nestjs/testing';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';

describe('NotasFiscaisController', () => {
  let controller: NotasFiscaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasFiscaisController],
      providers: [NotasFiscaisService],
    }).compile();

    controller = module.get<NotasFiscaisController>(NotasFiscaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
