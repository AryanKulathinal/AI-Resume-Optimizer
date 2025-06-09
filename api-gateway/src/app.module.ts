import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AiClientModule } from './ai/ai.module';
import { ContextController } from './ai/context.controller';
import { ResumeClientModule } from './resume/resume.module';
import { MulterModule } from '@nestjs/platform-express';




@Module({
  imports: [
    AuthModule,
    AiClientModule,
    ResumeClientModule,
    MulterModule.register()
  ],
  controllers: [ContextController],
})
export class AppModule {}





