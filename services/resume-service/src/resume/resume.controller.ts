import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller()
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @MessagePattern('createResume')
  create(@Payload() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @MessagePattern('findAllResume')
  findAll() {
    return this.resumeService.findAll();
  }

  @MessagePattern('findOneResume')
  findOne(@Payload() id: number) {
    return this.resumeService.findOne(id);
  }

  @MessagePattern('updateResume')
  update(@Payload() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(updateResumeDto.id, updateResumeDto);
  }

  @MessagePattern('removeResume')
  remove(@Payload() id: number) {
    return this.resumeService.remove(id);
  }

 

  // Input: { userId: number, resumePdfBase64: string, jobDetails: string }
  // Returns: { optimizedPdfBase64: string }
  @MessagePattern('optimizeResume')
  async optimizeResume(@Payload() payload: { userId: number; resumePdfBase64: string; jobDetails: string }) {
    return this.resumeService.optimizeResume(payload.userId, payload.resumePdfBase64, payload.jobDetails);
  }

  // Input: { userId: number, resumePdfBase64: string, jobDetails: string }
  // Returns: { score: number, comments: string[] }
  @MessagePattern('scoreResume')
  async scoreResume(@Payload() payload: { userId: number; resumePdfBase64: string; jobDetails: string }) {
    return this.resumeService.scoreResume(payload.userId, payload.resumePdfBase64, payload.jobDetails);
  }
}
