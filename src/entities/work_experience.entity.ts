import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurriculumVitae } from './curriculum_vitae.entity';
import { ExperienceProject } from './experience_project.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
  })
  time: string;

  @Column('varchar', {
    length: 50,
  })
  company: string;

  @Column('varchar', {
    length: 200,
  })
  job_title: string;

  @Column('varchar', {
    length: 200,
  })
  job_description: string;

  @Column({
    default: 0,
  })
  isDelete: number;

  @ManyToOne(() => CurriculumVitae, (cv) => cv.work_experiences)
  @JoinColumn({ name: 'cv_id' })
  curriculum_vitae: CurriculumVitae;

  @OneToMany(
    () => ExperienceProject,
    (experience_project) => experience_project.work_experience
  )
  experience_projects: ExperienceProject[];
}
