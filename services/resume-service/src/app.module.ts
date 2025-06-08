import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ResumeModule } from './resume/resume.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ResumeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
  ],
})
export class AppModule {}



