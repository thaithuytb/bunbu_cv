import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { db } from '../server';
import { EducationCertification } from '../entities/education_certification.entity';

export const createEducationCertification = async (
  educationCertification: EducationCertification,
  cv: CurriculumVitae
): Promise<EducationCertification> => {
  const newInstance = new EducationCertification();
  const newEducationCertification = await db
    .getRepository(EducationCertification)
    .merge(newInstance, educationCertification);

  newEducationCertification.curriculum_vitae = cv;

  return await db
    .getRepository(EducationCertification)
    .save(newEducationCertification);
};

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

export const deleteEducationCertification = async (e_c_id: number) => {
  await db.getRepository(EducationCertification).delete({ id: e_c_id });
};
