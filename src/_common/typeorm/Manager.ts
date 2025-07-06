import { BaseEntity } from 'src/_base/entity/base.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Manager extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;
}
