import { CurriculumVitae } from './curriculum_vitae.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('education_certifications')
export class EducationCertification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
  })
  name: string;

  @Column('varchar', {
    length: 50,
  })
  time: string;

  @Column('varchar', {
    length: 50,
  })
  major: string;

  @Column({
    default: 0,
  })
  isDelete: number;

  @ManyToOne(() => CurriculumVitae, (cv) => cv.education_certifications)
  @JoinColumn({ name: 'cv_id' })
  curriculum_vitae: CurriculumVitae;
}
