import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('ai_context')
  export class AiContext {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: number;
  
    @Column('text', { array: true, default: [] })
    aboutKeywords: string[];
  
    @Column('text', { array: true, default: [] })
    skillsKeywords: string[];
  
    @Column('text', { array: true, default: [] })
    goalKeywords: string[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  