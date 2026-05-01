import { PartialType } from '@nestjs/mapped-types';
import { CreateAprovaçoeDto } from './create-aprovaçoe.dto';

export class UpdateAprovaçoeDto extends PartialType(CreateAprovaçoeDto) {}
