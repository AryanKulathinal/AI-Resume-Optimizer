import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  jobDetails: string; 

  @Column({ type: 'float', nullable: true })
  score: number; 

  @Column('text')
  comments: string; 

  @CreateDateColumn()
  createdAt: Date;

}
