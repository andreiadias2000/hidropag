<<<<<<< HEAD
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
=======
// src/obras-empreendimentos/obras-empreendimentos.controller.ts

import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';

@Controller('obras')
export class ObrasEmpreendimentosController {
  
  constructor(private readonly obrasService: ObrasEmpreendimentosService) {}

  @Post()
  async criar(@Body() dados: any) {
    return await this.obrasService.create(dados);
  }

  @Get()
  async buscarTodos() {
    return await this.obrasService.findAll();
  }

  @Get(':id')
  async buscarUm(@Param('id') id: string) {
    return await this.obrasService.findOne(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dados: any) {
    await this.obrasService.update(id, dados);
>>>>>>> main
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
<<<<<<< HEAD
    return await this.service.excluir(id);
  }
}
=======
    await this.obrasService.remove(id);
  }
}



// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ObrasEmpreendimentosService } from './obras-empreendimentos.service';
// import { CreateObrasEmpreendimentoDto } from './dto/create-obras-empreendimento.dto';
// import { UpdateObrasEmpreendimentoDto } from './dto/update-obras-empreendimento.dto';

// @Controller('obras-empreendimentos')
// export class ObrasEmpreendimentosController {
//   constructor(private readonly obrasEmpreendimentosService: ObrasEmpreendimentosService) {}

//   @Post()
//   create(@Body() createObrasEmpreendimentoDto: CreateObrasEmpreendimentoDto) {
//     return this.obrasEmpreendimentosService.create(createObrasEmpreendimentoDto);
//   }

//   @Get()
//   findAll() {
//     return this.obrasEmpreendimentosService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.obrasEmpreendimentosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateObrasEmpreendimentoDto: UpdateObrasEmpreendimentoDto) {
//     return this.obrasEmpreendimentosService.update(+id, updateObrasEmpreendimentoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.obrasEmpreendimentosService.remove(+id);
//   }
// }
>>>>>>> main
