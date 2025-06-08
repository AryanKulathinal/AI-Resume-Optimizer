import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class OptimizeResumeDto {
  @IsString()
  @IsNotEmpty()
  resumePdfBase64: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;
}
