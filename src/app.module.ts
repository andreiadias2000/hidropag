import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FiliaisModule } from './filiais/filiais.module';
import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';
import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';

@Module({
  imports: [UsuariosModule, FiliaisModule, ObrasEmpreendimentosModule, NotasFiscaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
