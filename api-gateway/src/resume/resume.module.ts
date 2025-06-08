import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RESUME_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002, 
        },
      },
    ]),
  ],
  providers:[ResumeService],
  controllers:[ResumeController],
  exports: [ClientsModule],

})
export class ResumeClientModule {}
