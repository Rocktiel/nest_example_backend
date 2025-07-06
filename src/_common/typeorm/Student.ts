import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../_base/entity/base.entity';
import { Class } from './Class';
import { Parent } from './Parent';
import { StudentStatus } from '../enums/StudentStatus.enum';
import { ExamResult } from './ExamResult';

@Entity()
export class Student extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: StudentStatus, default: StudentStatus.ACTIVE })
  status: StudentStatus;

  @ManyToOne(() => Class, (classs) => classs.students)
  class: Class;

  @ManyToMany(() => Parent, (parent) => parent.students)
  parents: Parent[];

  @OneToMany(() => ExamResult, (examResult) => examResult.student)
  results: ExamResult[];
  //   @Column({ type: 'varchar', length: 255 })
  //   identityNumber: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   address: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   phoneNumber: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   email: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   password: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   role: string;

  //   @Column({ type: 'varchar', length: 255 })
  //   status: string;
}
