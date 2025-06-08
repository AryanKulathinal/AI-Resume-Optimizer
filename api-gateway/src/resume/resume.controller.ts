import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('optimize')
  @UseInterceptors(FileInterceptor('resume'))
  async optimizeResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
    @Body('jobDetails') jobDetails: string
  ) {
    const resumePdfBase64 = file.buffer.toString('base64');
    return this.resumeService.optimizeResume(+userId, resumePdfBase64, jobDetails);
  }
}
