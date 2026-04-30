import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';
import { CreateObrasEmpreendimentoDto } from './dto/create-obras-empreendimento.dto';
import { UpdateObrasEmpreendimentoDto } from './dto/update-obras-empreendimento.dto';

@Controller('obras-empreendimentos')
export class ObrasEmpreendimentosController {
  constructor(private readonly obrasEmpreendimentosService: ObrasEmpreendimentosService) {}

  @Post()
  create(@Body() createObrasEmpreendimentoDto: CreateObrasEmpreendimentoDto) {
    return this.obrasEmpreendimentosService.create(createObrasEmpreendimentoDto);
  }

  @Get()
  findAll() {
    return this.obrasEmpreendimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obrasEmpreendimentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObrasEmpreendimentoDto: UpdateObrasEmpreendimentoDto) {
    return this.obrasEmpreendimentosService.update(+id, updateObrasEmpreendimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obrasEmpreendimentosService.remove(+id);
  }
}
