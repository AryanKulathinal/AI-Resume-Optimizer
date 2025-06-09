import { IsString, IsNotEmpty } from 'class-validator';

export class ScoreResumeDto {
  @IsString()
  @IsNotEmpty()
  resumePdfBase64: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;
}
