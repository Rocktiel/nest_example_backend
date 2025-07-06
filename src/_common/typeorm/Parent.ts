import { BaseEntity } from 'src/_base/entity/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

import { Student } from './Student';

@Entity()
export class Parent extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, comment: 'Format = 905055055050' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToMany(() => Student, (student) => student.parents)
  students: Student[];
}
