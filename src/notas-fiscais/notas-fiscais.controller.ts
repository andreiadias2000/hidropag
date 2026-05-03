// src/notas-fiscais/notas-fiscais.controller.ts

import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';

@Controller('notas-fiscais')
export class NotasFiscaisController {
  
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post()
  async criar(@Body() dados: any) {
    return await this.notasFiscaisService.create(dados);
  }

  @Get()
  async buscarTodos() {
    return await this.notasFiscaisService.findAll();
  }

  // Recebe o ID como string
  @Get(':id')
  async buscarUm(@Param('id') id: string) {
    return await this.notasFiscaisService.findOne(id);
  }

  // Recebe o ID como string
  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dados: any) {
    await this.notasFiscaisService.update(id, dados);
  }

  // Recebe o ID como string
  @Delete(':id')
  async remover(@Param('id') id: string) {
    await this.notasFiscaisService.remove(id);
  }
}


// src/notas-fiscais/notas-fiscais.controller.ts

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { NotasFiscaisService } from './notas-fiscais.service';
// import { CreateNotasFiscaiDto } from './dto/create-notas-fiscai.dto';
// import { UpdateNotasFiscaiDto } from './dto/update-notas-fiscai.dto';

// @Controller('notas-fiscais')
// export class NotasFiscaisController {
//   constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

//   @Post()
//   create(@Body() createNotasFiscaiDto: CreateNotasFiscaiDto) {
//     return this.notasFiscaisService.create(createNotasFiscaiDto);
//   }

//   @Get()
//   findAll() {
//     return this.notasFiscaisService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.notasFiscaisService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateNotasFiscaiDto: UpdateNotasFiscaiDto) {
//     return this.notasFiscaisService.update(+id, updateNotasFiscaiDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.notasFiscaisService.remove(+id);
//   }
// }
