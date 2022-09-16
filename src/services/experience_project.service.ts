import { db } from '../server';
import { ExperienceProject } from '../entities/experience_project.entity';
import { WorkExperience } from '../entities/work_experience.entity';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';

export const createExperienceProject = async (
  payloadBody: ExperienceProject,
  cv: CurriculumVitae,
  w_e: WorkExperience
) => {
  const experienceProject = await db
    .getRepository(ExperienceProject)
    .create(payloadBody);

  experienceProject.curriculum_vitae = cv;
  experienceProject.work_experience = w_e;

  return await db.getRepository(ExperienceProject).save(experienceProject);
};

export const findExperienceProjectByIdAndCvId = async (
  e_p_id: number,
  cv_id: number
): Promise<ExperienceProject | null> => {
  return await db.getRepository(ExperienceProject).findOneBy({
    id: e_p_id,
    curriculum_vitae: {
      id: cv_id,
    },
  });
};

export const updateExperienceProject = async (
  e_p_id: number,
  payload: ExperienceProject,
  e_p: ExperienceProject
) => {
  return db
    .getRepository(ExperienceProject)
    .save({ ...e_p, ...payload, id: e_p_id });
};
