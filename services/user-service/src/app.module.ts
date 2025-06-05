import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { AuthModule } from '../../../api-gateway/src/auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SModule } from './s/s.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    SubmissionsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    SModule,
  ],
})
export class AppModule {}



