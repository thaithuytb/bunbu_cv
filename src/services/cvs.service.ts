import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { db } from '../server';
import { EducationCertification } from '../entities/education_certification.entity';

export const findEducationCertificationByIdAndCvId = async (
  e_c_id: number,
  cv_id: number
): Promise<EducationCertification | null> => {
  return await db.getRepository(EducationCertification).findOne({
    where: {
      id: e_c_id,
      curriculum_vitae: {
        id: cv_id,
      },
    },
  });
};

export const updateEducationCertificationById = async (
  e_c_id: number,
  payload: EducationCertification,
  e_c: EducationCertification
) => {
  return await db
    .getRepository(EducationCertification)
    .save({ ...e_c, ...payload, id: e_c_id });
};

export const findOneCvByIdWithJoin = async (
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
