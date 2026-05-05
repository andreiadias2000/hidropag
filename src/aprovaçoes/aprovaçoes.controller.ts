<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
import { APROVACOES } from './entities/aprovaçoe.entity';
=======
// src/aprovaçoes/aprovaçoes.controller.ts

import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
>>>>>>> main

@Controller('APROVACOES') // Rota: http://localhost:3000/APROVACOES
export class AprovaçoesController {
  
  constructor(private readonly aprovaçoesService: AprovaçoesService) {}

  @Post()
<<<<<<< HEAD
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
=======
  async criar(@Body() dados: any) { 
    return await this.aprovaçoesService.create(dados);
  }

  @Get()
  async buscarTodos() {
    return await this.aprovaçoesService.findAll();
  }

  @Get(':id')
  async buscarUm(@Param('id') id: number) {
    return await this.aprovaçoesService.findOne(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: number, @Body() dados: any) {
    await this.aprovaçoesService.update(id, dados);
  }

  @Delete(':id')
  async remover(@Param('id') id: number) {
    await this.aprovaçoesService.remove(id);
  }
}

//aprovaçoes.controller.ts

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AprovaçoesService } from './aprovaçoes.service';
// import { CreateAprovaçoeDto } from './dto/create-aprovaçoe.dto';
// import { UpdateAprovaçoeDto } from './dto/update-aprovaçoe.dto';

// @Controller('aprovaçoes')
// export class AprovaçoesController {
//   constructor(private readonly aprovaçoesService: AprovaçoesService) {}

//   @Post()
//   create(@Body() createAprovaçoeDto: CreateAprovaçoeDto) {
//     return this.aprovaçoesService.create(createAprovaçoeDto);
//   }

//   @Get()
//   findAll() {
//     return this.aprovaçoesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.aprovaçoesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAprovaçoeDto: UpdateAprovaçoeDto) {
//     return this.aprovaçoesService.update(+id, updateAprovaçoeDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.aprovaçoesService.remove(+id);
//   }
// }


>>>>>>> main
