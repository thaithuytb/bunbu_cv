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

export const findWorkExperienceByIdAndCvId = async (
  w_e_id: number,
  cv_id: number
): Promise<WorkExperience | null> => {
  return await db.getRepository(WorkExperience).findOne({
    where: {
      id: w_e_id,
      curriculum_vitae: {
        id: cv_id,
      },
    },
  });
};

export const updateWorkExperienceById = async (
  w_e_id: number,
  payload: WorkExperience,
  w_e: WorkExperience
) => {
  return await db
    .getRepository(WorkExperience)
    .save({ ...w_e, ...payload, id: w_e_id });
};

export const deleteWorkExperienceById = async (w_e_id: number) => {
  await db.getRepository(WorkExperience).delete({ id: w_e_id });
};
