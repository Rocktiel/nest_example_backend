import { BaseEntity } from 'src/_base/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './Lesson';
import { ExamResult } from './ExamResult';

@Entity()
export class Exam extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  date: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.exams)
  lesson: Lesson;

  @OneToMany(() => ExamResult, (examResult) => examResult.exam)
  results: ExamResult[];
}
