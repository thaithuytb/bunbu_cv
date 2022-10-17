import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CurriculumVitae } from './curriculum_vitae.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameFile!: string;

  @Column()
  mimetype!: string;

  @Column({
    default: 0,
  })
  isDelete: number;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => CurriculumVitae, (curriculum_vitae) => curriculum_vitae.image)
  curriculum_vitae: CurriculumVitae;
}
