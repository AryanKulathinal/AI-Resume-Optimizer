import { Controller, Post, Body, UseInterceptors, UploadedFile,Res, UseGuards } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('optimize')
  @UseInterceptors(FileInterceptor('file'))
  async optimizeResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
    @Body('jobDetails') jobDetails: string,
    @Res() res: Response
  ) {
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
  
    const resumePdfBase64 = file.buffer.toString('base64');
  
    const {converted} = await this.resumeService.optimizeResume(+userId, resumePdfBase64, jobDetails);
    
    if (!converted) {
      return res.status(500).send('Failed to optimize resume');
    }
  
    const pdfBuffer = Buffer.from(converted, 'base64');
  
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=optimized_resume.pdf',
    });
  
    return res.send(pdfBuffer);
  }

  @Post('score')
  @UseInterceptors(FileInterceptor('file'))
  async scoreResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
    @Body('jobDetails') jobDetails: string,
    @Res() res: Response
  ) {
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
  
    const resumePdfBase64 = file.buffer.toString('base64');
  
    const result = await this.resumeService.scoreResume(+userId, resumePdfBase64, jobDetails);
    
    if (!result) {
      return res.status(500).send('Failed to score resume');
    }
  
    
    return res.send(result);
  }
}
