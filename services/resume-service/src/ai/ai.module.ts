import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AI_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost', 
          port: 3003,         
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AiClientModule {}
