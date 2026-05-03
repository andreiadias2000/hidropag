import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';
import { Obras } from './entities/obras-empreendimento.entity';

@Controller('OBRAS') // Mudei para 'obras' para facilitar o teste
export class ObrasEmpreendimentosController {
  constructor(private readonly service: ObrasEmpreendimentosService) {}

  @Post()
  async criar(@Body() dados: Obras) {
    return await this.service.inserir(dados);
  }

  @Get()
  async buscarTodas() {
    return await this.service.listar();
  }

  @Get(':id')
  async buscarUma(@Param('id') id: string) {
    return await this.service.buscarPorId(id);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() dados: Partial<Obras>) {
    return await this.service.alterar(id, dados);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    return await this.service.excluir(id);
  }
}