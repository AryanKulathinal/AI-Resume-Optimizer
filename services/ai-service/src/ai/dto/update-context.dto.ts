import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateContextDto {
  @IsNotEmpty()
  userId: number;

  @IsString()
  contextType: 'about' | 'skills' | 'goals'; 

  @IsString()
  text: string; 
}
