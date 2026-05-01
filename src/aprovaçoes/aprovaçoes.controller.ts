import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
import { CreateAprovaçoeDto } from './dto/create-aprovaçoe.dto';
import { UpdateAprovaçoeDto } from './dto/update-aprovaçoe.dto';

@Controller('aprovaçoes')
export class AprovaçoesController {
  constructor(private readonly aprovaçoesService: AprovaçoesService) {}

  @Post()
  create(@Body() createAprovaçoeDto: CreateAprovaçoeDto) {
    return this.aprovaçoesService.create(createAprovaçoeDto);
  }

  @Get()
  findAll() {
    return this.aprovaçoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aprovaçoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAprovaçoeDto: UpdateAprovaçoeDto) {
    return this.aprovaçoesService.update(+id, updateAprovaçoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aprovaçoesService.remove(+id);
  }
}
