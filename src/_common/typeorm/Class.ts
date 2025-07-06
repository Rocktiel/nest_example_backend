import { BaseEntity } from 'src/_base/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Class extends BaseEntity {
  @Column({ type: 'varchar', length: 70 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
