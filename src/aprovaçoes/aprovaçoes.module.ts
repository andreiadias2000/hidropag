// import { Module } from '@nestjs/common';
// import { AprovaçoesService } from './aprovaçoes.service';
// import { AprovaçoesController } from './aprovaçoes.controller';

// @Module({
//   controllers: [AprovaçoesController],
//   providers: [AprovaçoesService],
// })
// export class AprovaçoesModule {}


// src/aprovaçoes/aprovaçoes.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AprovaçoesService } from './aprovaçoes.service';
import { AprovaçoesController } from './aprovaçoes.controller';
import { APROVACOES } from './entities/aprovaçoe.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity'; 

@Module({
  imports: [
    // Essa é a linha que resolve o erro! Ela avisa o NestJS para liberar as tabelas.
    TypeOrmModule.forFeature([APROVACOES, Usuarios])
  ],
  controllers: [AprovaçoesController],
  providers: [AprovaçoesService],
})
export class AprovaçoesModule {}