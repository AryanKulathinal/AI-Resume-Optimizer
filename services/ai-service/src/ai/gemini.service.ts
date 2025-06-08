import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {
  private readonly apiKey = process.env.GEMINI_API_KEY;
  private readonly model = 'gemini-2.0-flash';

  async extractKeywords(
    text: string,
    contextType: 'about' | 'skills' | 'goals',
  ): Promise<string[]> {
    const promptMap = {
      about:
        'Extract 10 important keywords that describe this person’s background and personality, always return 10 keywords based on whatever data available,only return 10 keywords in response as list nothing else:',
      skills:
        'Extract 10 technical or soft skills from the following text, always return 10 keywords based on whatever data available,only return 10 keywords in response as list nothing else:',
      goals:
        'Extract 10 goal-related or ambition-oriented keywords from the following text,  always return 10 keywords based on whatever data available,only return 10 keywords in response as list nothing else:',
    };
    console.log('text : ', text);
    const prompt = `${promptMap[contextType]}\n${text}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const outputText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const keywords = this.parseKeywords(outputText);
    console.log('output', outputText);
    console.log(keywords);
    return keywords;
  }

  private parseKeywords(text: string): string[] {
    return text
      .replace(/[\[\]\n\r"']/g, '')
      .replace(/(\d+\.)|[-•–]/g, '')
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0)
      .slice(0, 10);
  }

  async optimizeResumeText(
    resumeText: string,
    jobDescription: string,
  ): Promise<string> {
    const prompt = `
    You are a professional resume writer.
    Based on the following job description and current resume content, rewrite the resume to better match the job while keeping it concise and professional.
    Only return the optimized resume as plain text. Do not add explanations or formatting hints. Also try to follow the structure of the current resume.
    ---
    Job Description:${jobDescription}
    ---
    Current Resume:${resumeText}`.trim();
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const output =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return output;
  }
}
