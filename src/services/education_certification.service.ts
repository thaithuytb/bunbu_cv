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

export const deleteOneEducationCertification = async (e_c_id: number) => {
  await db.getRepository(EducationCertification).delete({ id: e_c_id });
};
