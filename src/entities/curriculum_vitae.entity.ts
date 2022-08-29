import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EducationCertification } from './education_certification.entity';
import { ExperienceProject } from './experience_project.entity';
import { User } from './user.entity';
import { WorkExperience } from './work_experience.entity';

@Entity('curriculum_vitaes')
export class CurriculumVitae {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
  })
  name: string;

  @Column('varchar', {
    length: 50,
  })
  nationality: string;

  @Column('varchar', {
    length: 50,
  })
  gender: string;

  @Column({
    type: 'longtext',
  })
  objective: string;

  @Column({
    type: 'longtext',
  })
  summary: string;

  @ManyToOne(() => User, (user) => user.curriculum_vitaes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => EducationCertification,
    (education_certification) => education_certification.curriculum_vitae
  )
  education_certifications: EducationCertification[];

  @OneToMany(
    () => WorkExperience,
    (work_experience) => work_experience.curriculum_vitae
  )
  work_experiences: WorkExperience[];

  @OneToMany(
    () => ExperienceProject,
    (experience_project) => experience_project.curriculum_vitae
  )
  experience_projects: ExperienceProject[];
}
