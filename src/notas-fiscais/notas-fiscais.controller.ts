import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { Notas } from './entities/notas-fiscais.entity';

@Controller('NOTAS')
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post()
  async criar(@Body() nota: Notas) {
    return await this.notasFiscaisService.inserir(nota);
  }

  @Get()
  async buscarTodas() {
    return await this.notasFiscaisService.listar();
  }

  @Get(':id')
  async buscarUma(@Param('id') id: string) {
    return await this.notasFiscaisService.buscarPorId(id);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() nota: Partial<Notas>) {
    return await this.notasFiscaisService.alterar(id, nota);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    return await this.notasFiscaisService.excluir(id);
  }
}