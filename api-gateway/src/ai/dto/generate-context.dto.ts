import { IsEnum, IsNumber, IsString } from 'class-validator';

export class GenerateContextDto {
  @IsNumber()
  userId: number;

  @IsEnum(['about', 'skills', 'goals'])
  contextType: 'about' | 'skills' | 'goals';

  @IsString()
  text: string;
}
