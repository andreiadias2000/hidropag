import { Test, TestingModule } from '@nestjs/testing';
import { AprovaçoesController } from './aprovaçoes.controller';
import { AprovaçoesService } from './aprovaçoes.service';

describe('AprovaçoesController', () => {
  let controller: AprovaçoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AprovaçoesController],
      providers: [AprovaçoesService],
    }).compile();

    controller = module.get<AprovaçoesController>(AprovaçoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
