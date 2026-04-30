import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiliaisService } from './filiais.service';
import { CreateFiliaiDto } from './dto/create-filiai.dto';
import { UpdateFiliaiDto } from './dto/update-filiai.dto';

@Controller('filiais')
export class FiliaisController {
  constructor(private readonly filiaisService: FiliaisService) {}

  @Post()
  create(@Body() createFiliaiDto: CreateFiliaiDto) {
    return this.filiaisService.create(createFiliaiDto);
  }

  @Get()
  findAll() {
    return this.filiaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filiaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiliaiDto: UpdateFiliaiDto) {
    return this.filiaisService.update(+id, updateFiliaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filiaisService.remove(+id);
  }
}
