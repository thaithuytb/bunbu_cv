import { db } from '../server';
import { WorkExperience } from '../entities/work_experience.entity';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';

export const createWorkExperience = async (
  payload: WorkExperience,
  cv: CurriculumVitae
): Promise<WorkExperience> => {
  const newInstance = new WorkExperience();
  const newWorkExperience = await db
    .getRepository(WorkExperience)
    .merge(newInstance, payload);
  newWorkExperience.curriculum_vitae = cv;
  return await db.getRepository(WorkExperience).save(newWorkExperience);
};
