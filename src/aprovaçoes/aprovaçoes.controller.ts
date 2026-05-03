import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
import { APROVACOES } from './entities/aprovaçoe.entity';

@Controller('APROVACOES') // Rota: http://localhost:3000/APROVACOES
export class AprovaçoesController {
  constructor(private readonly aprovaçoesService: AprovaçoesService) {}

  @Post()
  async criar(@Body() dados: APROVACOES) {
    return await this.aprovaçoesService.inserir(dados);
  }

  @Get()
  async buscarTodas() {
    return await this.aprovaçoesService.listar();
  }

  @Get(':id')
  async buscarUma(@Param('id') id: string) {
    return await this.aprovaçoesService.buscarPorId(id);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    return await this.aprovaçoesService.excluir(id);
  }
}