import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { CreateNotasFiscaiDto } from './dto/create-notas-fiscai.dto';
import { UpdateNotasFiscaiDto } from './dto/update-notas-fiscai.dto';

@Controller('notas-fiscais')
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post()
  create(@Body() createNotasFiscaiDto: CreateNotasFiscaiDto) {
    return this.notasFiscaisService.create(createNotasFiscaiDto);
  }

  @Get()
  findAll() {
    return this.notasFiscaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasFiscaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotasFiscaiDto: UpdateNotasFiscaiDto) {
    return this.notasFiscaisService.update(+id, updateNotasFiscaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasFiscaisService.remove(+id);
  }
}
