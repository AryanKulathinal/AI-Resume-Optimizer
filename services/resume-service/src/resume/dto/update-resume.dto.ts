import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the resume to update' })
  id: number;
}
