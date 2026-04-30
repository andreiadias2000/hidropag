import { Module } from '@nestjs/common';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';
import { ObrasEmpreendimentosController } from './obras-empreendimentos.controller';

@Module({
  controllers: [ObrasEmpreendimentosController],
  providers: [ObrasEmpreendimentosService],
})
export class ObrasEmpreendimentosModule {}
