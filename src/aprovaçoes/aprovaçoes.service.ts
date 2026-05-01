import { Injectable } from '@nestjs/common';
import { CreateAprovaçoeDto } from './dto/create-aprovaçoe.dto';
import { UpdateAprovaçoeDto } from './dto/update-aprovaçoe.dto';

@Injectable()
export class AprovaçoesService {
  create(createAprovaçoeDto: CreateAprovaçoeDto) {
    return 'This action adds a new aprovaçoe';
  }

  findAll() {
    return `This action returns all aprovaçoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aprovaçoe`;
  }

  update(id: number, updateAprovaçoeDto: UpdateAprovaçoeDto) {
    return `This action updates a #${id} aprovaçoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} aprovaçoe`;
  }
}
