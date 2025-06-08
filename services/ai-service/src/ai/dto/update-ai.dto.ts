import { PartialType } from '@nestjs/mapped-types';
import { CreateAiDto } from './create-ai.dto';
import { IsInt } from 'class-validator';

export class UpdateAiDto extends PartialType(CreateAiDto) {
  @IsInt()
  id: number;
}
