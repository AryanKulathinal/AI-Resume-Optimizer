import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,

    @Inject('AI_SERVICE')
    private readonly aiClient: ClientProxy,
  ) {}

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    try {
      const resume = this.resumeRepository.create(createResumeDto);
      return await this.resumeRepository.save(resume);
    } catch (error) {
      console.error('Error creating resume:', error);
      throw new InternalServerErrorException('Failed to create resume');
    }
  }

  async findAll(): Promise<Resume[]> {
    return this.resumeRepository.find();
  }

  async findOne(id: number): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.findOne(id);
    Object.assign(resume, updateResumeDto);
    return this.resumeRepository.save(resume);
  }

  async remove(id: number): Promise<{ message: string }> {
    const resume = await this.findOne(id);
    await this.resumeRepository.remove(resume);
    return { message: `Resume with ID ${id} deleted` };
  }

  async optimizeResume(
    userId: number,
    resumePdfBase64: string,
    jobDetails: string,
  ): Promise<{ optimizedPdfBase64: string }> {
    try {
      const result = await firstValueFrom(
        this.aiClient.send('optimizeResume', {
          userId,
          resumePdfBase64,
          jobDescription: jobDetails,
        }),
      );
      return result;
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw new InternalServerErrorException('Failed to optimize resume');
    }
  }

  async scoreResume(userId: number, resumePdfBase64: string, jobDetails: string): Promise<{ score: number; comments: string }> {
    try {
      const payload = { userId, resumePdfBase64, jobDescription: jobDetails };
      const result = await firstValueFrom(this.aiClient.send('scoreResume', payload));
  
    
      const scoreEntity = this.resumeRepository.create({
        userId,
        jobDetails:jobDetails,
        score: result.score,
        comments: result.comments,
        createdAt: new Date(),
      });
  
      await this.resumeRepository.save(scoreEntity);
  
      return result;
    } catch (error) {
      console.error('Failed to score resume:', error);
      throw new InternalServerErrorException('Resume scoring failed');
    }
  }
  
}
