// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsuariosModule } from './usuarios/usuarios.module';
// import { FiliaisModule } from './filiais/filiais.module';
// import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';
// import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
// import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';

// @Module({
//   imports: [UsuariosModule, FiliaisModule, ObrasEmpreendimentosModule, NotasFiscaisModule, AprovaçoesModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source'; 
import { FiliaisModule } from './filiais/filiais.module';
import { UsuariosModule } from './usuarios/usuarios.module'; // IMPORTAÇÃO CORRETA

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    FiliaisModule,
    UsuariosModule, // <--- AQUI DEVE SER O MODULE, NÃO A ENTIDADE
  ],
})
export class AppModule {}