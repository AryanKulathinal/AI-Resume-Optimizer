import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { GenerateContextDto } from './dto/generate-context.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
