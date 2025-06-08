import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column('text')
  jobDetails: string; 

  @Column({ type: 'float', nullable: true })
  score: number; 

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  uploadedAt: Date; 
}
