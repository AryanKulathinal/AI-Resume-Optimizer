import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { UpdateContextDto } from './dto/update-context.dto';
import { OptimizeResumeDto } from './dto/optimize-resume.dto';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @MessagePattern('createAi')
  create(@Payload() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto);
  }

  @MessagePattern('findAllAi')
  findAll() {
    return this.aiService.findAll();
  }

  @MessagePattern('findOneAi')
  findOne(@Payload() id: number) {
    return this.aiService.findOne(id);
  }

  @MessagePattern('updateAi')
  update(@Payload() updateAiDto: UpdateAiDto) {
    return this.aiService.update(updateAiDto.id, updateAiDto);
  }

  @MessagePattern('removeAi')
  remove(@Payload() id: number) {
    return this.aiService.remove(id);
  }

  @MessagePattern('updateContext')
  async updateContext(@Payload() updateContextDto: UpdateContextDto) {
    return this.aiService.updateContext(updateContextDto);
  }

  @MessagePattern('optimizeResume')
  async optimizeResume(@Payload() optimizeDto: OptimizeResumeDto) {
    return this.aiService.optimizeResume(optimizeDto);
  }
}
