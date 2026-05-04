import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { Notas } from './entities/notas-fiscais.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('NOTAS')
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' é o nome do campo no Thunder Client
  async criar(@Body() nota: Notas, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      nota.arquivoPdf = file.buffer; // Salva o conteúdo binário do PDF
    }
    return await this.notasFiscaisService.inserir(nota);
  }

  // @Post()
  // async criar(@Body() nota: Notas) {
  //   return await this.notasFiscaisService.inserir(nota);
  // }

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