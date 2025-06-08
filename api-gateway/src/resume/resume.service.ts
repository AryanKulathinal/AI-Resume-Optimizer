import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ResumeService {
  constructor(
    @Inject('RESUME_SERVICE') private readonly resumeClient: ClientProxy,
  ) {}

  async optimizeResume(
    userId: number,
    resumePdfBase64: string,
    jobDetails: string,
  ): Promise<{ optimizedPdfBase64: string }> {
    try {
      const payload = { userId, resumePdfBase64, jobDetails };
      const result = await firstValueFrom(
        this.resumeClient.send('optimizeResume', payload),
      );
      return result;
    } catch (error) {
      console.error('Gateway error:', error);
      throw new InternalServerErrorException('Resume optimization failed');
    }
  }
}
