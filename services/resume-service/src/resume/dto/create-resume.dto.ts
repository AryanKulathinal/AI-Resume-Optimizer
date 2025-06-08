import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john_doe_resume.pdf' })
  filename: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2025-06-07T12:00:00.000Z' })
  uploadedAt: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Senior Software Engineer at Google', required: false })
  jobDetails?: string;

  @IsOptional()
  @ApiProperty({ example: 85, description: 'Resume score out of 100', required: false })
  score?: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'User ID who uploaded the resume' })
  userId: number;
}
