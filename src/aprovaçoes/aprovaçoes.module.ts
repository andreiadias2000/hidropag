import { Module } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
import { AprovaçoesController } from './aprovaçoes.controller';

@Module({
  controllers: [AprovaçoesController],
  providers: [AprovaçoesService],
})
export class AprovaçoesModule {}
