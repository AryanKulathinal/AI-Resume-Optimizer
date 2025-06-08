import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiContext } from './entities/ai.entity';
import { GeminiService } from './gemini.service';

@Module({
  imports: [TypeOrmModule.forFeature([AiContext])],
  controllers: [AiController],
  providers: [AiService, GeminiService],
})
export class AiModule {}
