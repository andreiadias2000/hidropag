import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source'; 
import { FiliaisModule } from './filiais/filiais.module';
import { UsuariosModule } from './usuarios/usuarios.module'; 
import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';
import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    FiliaisModule,
    UsuariosModule,
    NotasFiscaisModule,
    AprovaçoesModule,
    ObrasEmpreendimentosModule, // Removi a duplicata do FiliaisModule que estava aqui embaixo
  ],
})
export class AppModule {}