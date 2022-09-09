import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurriculumVitae } from './curriculum_vitae.entity';
import { WorkExperience } from './work_experience.entity';

@Entity('experience_projects')
export class ExperienceProject {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('varchar', {
    length: 100,
  })
    name: string;

  @Column('varchar', {
    length: 50,
  })
    time: string;

  @Column('varchar', {
    length: 200,
  })
    project_description: string;

  @Column('varchar', {
    length: 100,
  })
    role: string;

  @Column('varchar', {
    length: 200,
  })
    responsibilities: string;

  @Column('varchar', {
    length: 200,
  })
    programming_languages: string;

  @ManyToOne(() => CurriculumVitae, (cv) => cv.experience_projects)
  @JoinColumn({ name: 'cv_id' })
    curriculum_vitae: CurriculumVitae;

  @OneToOne(() => WorkExperience, {
    nullable: true,
  })
  @JoinColumn({ name: 'work_experience_id' })
    work_experience: WorkExperience;
}
