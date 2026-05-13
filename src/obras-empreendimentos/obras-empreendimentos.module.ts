// src/obras-empreendimentos/obras-empreendimentos.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';
import { ObrasEmpreendimentosController } from './obras-empreendimentos.controller';
import { Obras } from './entities/obras-empreendimento.entity';
import { Filiais } from '../filiais/entities/filiais.entity'; // importada a entidade Filiais

@Module({
   // adicionei Filiais dentro do colchete do imports
  imports: [TypeOrmModule.forFeature([Obras, Filiais])], 
  controllers: [ObrasEmpreendimentosController],
  providers: [ObrasEmpreendimentosService],
})
export class ObrasEmpreendimentosModule {}

