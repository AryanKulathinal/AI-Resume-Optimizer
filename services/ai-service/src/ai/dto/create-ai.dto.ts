import { IsInt, IsArray, IsOptional, IsString, ArrayMaxSize } from 'class-validator';

export class CreateAiDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  aboutKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  skillsKeywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  goalKeywords?: string[];
}
