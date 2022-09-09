import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurriculumVitae } from './curriculum_vitae.entity';

export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('varchar', {
    length: 50,
  })
    email: string;

  @Column('varchar', {
    length: 50,
  })
    username: string;

  @Column('varchar', {
    length: 100,
  })
    password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
    role: UserRole;

  @OneToMany(() => CurriculumVitae, (cv) => cv.user)
    curriculum_vitaes: CurriculumVitae[];
}
