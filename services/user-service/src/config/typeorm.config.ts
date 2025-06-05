import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  
  useFactory: (configService: ConfigService) => {

    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT') || '5432'),
      username: configService.get<string>('DB_USERNAME')!,
      password: configService.get<string>('DB_PASSWORD')!,
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
  
};