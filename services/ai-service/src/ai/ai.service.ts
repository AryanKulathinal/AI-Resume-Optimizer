import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiContext } from './entities/ai.entity';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { UpdateContextDto } from './dto/update-context.dto';
import { GeminiService } from './gemini.service';
import * as pdfParse from 'pdf-parse';
import { OptimizeResumeDto } from './dto/optimize-resume.dto';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ScoreResumeDto } from './dto/score-resume.dto';

@Injectable()
export class AiService {
  constructor(
    @InjectRepository(AiContext)
    private readonly aiRepository: Repository<AiContext>,
    private readonly geminiService: GeminiService,
  ) {}

  async create(createAiDto: CreateAiDto) {
    const ai = this.aiRepository.create(createAiDto);
    return this.aiRepository.save(ai);
  }

  async findAll() {
    return this.aiRepository.find();
  }

  async findOne(id: number) {
    const ai = await this.aiRepository.findOneBy({ id });
    if (!ai) throw new NotFoundException(`AI record with id ${id} not found`);
    return ai;
  }

  async update(id: number, updateAiDto: UpdateAiDto) {
    const ai = await this.findOne(id);
    Object.assign(ai, updateAiDto);
    return this.aiRepository.save(ai);
  }

  async remove(id: number) {
    const ai = await this.findOne(id);
    return this.aiRepository.remove(ai);
  }

  async updateContext({ userId, contextType, text }: UpdateContextDto) {
    const fieldMap = {
      about: 'aboutKeywords',
      skills: 'skillsKeywords',
      goals: 'goalKeywords',
    };

    const fieldKey = fieldMap[contextType];

    let ai = await this.aiRepository.findOne({ where: { userId } });

    if (ai && ai[fieldKey] && ai[fieldKey].length > 0) {
      throw new ConflictException(
        `Context "${contextType}" already exists for user ${userId}.`,
      );
    }

    const keywords = await this.geminiService.extractKeywords(
      text,
      contextType,
    );

    if (ai) {
      ai[fieldKey] = keywords;
    } else {
      ai = this.aiRepository.create({
        userId,
        [fieldKey]: keywords,
      });
    }

    const result = await this.aiRepository.save(ai);
    console.log('Saved AI:', result);
    return result;
  }

  async  generatePdfFromText(text: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  
    const fontSize = 12;
    const lineHeight = fontSize + 4;
    const margin = 50;
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const maxWidth = pageWidth - 2 * margin;
  
    const paragraphs = text.split('\n');
    let lines: string[] = [];
  
    // Word-wrap each paragraph
    for (const para of paragraphs) {
      const words = para.split(' ');
      let currentLine = '';
  
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
  
        if (testWidth < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
  
      // Add empty line for paragraph break
      lines.push('');
    }
  
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;
  
    for (const line of lines) {
      if (y < margin + lineHeight) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
  
      if (line !== '') {
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }
      y -= lineHeight;
    }
  
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
  async optimizeResume({ resumePdfBase64, jobDescription }: OptimizeResumeDto) {
    // Decode base64 PDF
    const resumeBuffer = Buffer.from(resumePdfBase64, 'base64');
    // Extract text from the PDF
    const parsed = await pdfParse(resumeBuffer);
    const resumeText = parsed.text;
    // Call Gemini with the resume and job description
    const optimizedResume = await this.geminiService.optimizeResumeText(
      resumeText,
      jobDescription,
    );
    const pdfBuffer = await this.generatePdfFromText(optimizedResume) 
    const converted = pdfBuffer.toString('base64');
    return { converted };
  }

  async scoreResume({ resumePdfBase64, jobDescription }: ScoreResumeDto): Promise<{ score: number; comments: string[] }> {
    const resumeBuffer = Buffer.from(resumePdfBase64, 'base64');
    const parsed = await pdfParse(resumeBuffer);
    const resumeText = parsed.text;
  
    const result = await this.geminiService.scoreResumeText(resumeText, jobDescription);
  
    return result;
  }
 
}
