import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { GenerateContextDto } from './dto/generate-context.dto';

@Controller('context')
export class ContextController {
  constructor(
    @Inject('AI_SERVICE') private readonly aiClient: ClientProxy,
  ) {}

  @Post('generate')
  async updateContext(@Body() updateContextDto: GenerateContextDto) {
    return this.aiClient.send('updateContext', updateContextDto).toPromise();
  }
}
