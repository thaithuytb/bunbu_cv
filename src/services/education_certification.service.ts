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
