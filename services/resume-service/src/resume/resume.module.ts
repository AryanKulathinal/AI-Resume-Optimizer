import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume } from './entities/resume.entity';
import { AiClientModule } from 'src/ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), AiClientModule],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
