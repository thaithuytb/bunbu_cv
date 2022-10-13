import { db } from '../server';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';

export const findCvById = async (
  id: number
): Promise<CurriculumVitae | null> => {
  return await db.getRepository(CurriculumVitae).findOneBy({ id });
};

export const findCvByIdAndUserId = async (
  cv_id: number,
  user_id: number
): Promise<CurriculumVitae | null> => {
  return await db.getRepository(CurriculumVitae).findOneBy({
    id: cv_id,
    user: {
      id: user_id,
    },
  });
};

export const findCvByIdWithJoin = async (
  id: number
): Promise<CurriculumVitae | null> => {
  return await db.getRepository(CurriculumVitae).findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });
};

export const findCvByIdAndUserIdWithRelation = async (
  cv_id: number,
  user_id: number
): Promise<CurriculumVitae | null> => {
  return await db.getRepository(CurriculumVitae).findOne({
    where: {
      id: cv_id,
      user: {
        id: user_id,
      },
    },
    relations: [
      'education_certifications',
      'experience_projects',
      'work_experiences',
    ],
  });
};
