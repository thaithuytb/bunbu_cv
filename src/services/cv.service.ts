import { db } from '../server';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { ExperienceProject } from '../entities/experience_project.entity';
import { EducationCertification } from '../entities/education_certification.entity';
import { WorkExperience } from '../entities/work_experience.entity';

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

export const findCvWithAllRelationByIdAndUserId = async (
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
      'work_experiences',
      'experience_projects',
    ],
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

export const deleteCv = async (cv: CurriculumVitae): Promise<boolean> => {
  const queryRunner = await db.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (cv.experience_projects.length) {
      await Promise.all(
        cv.experience_projects.map(async (e_p) => {
          return await queryRunner.manager
            .getRepository(ExperienceProject)
            .save({ ...e_p, isDelete: 1 });
        })
      );
    }

    if (cv.education_certifications.length) {
      await Promise.all(
        cv.education_certifications.map(async (e_c) => {
          return await queryRunner.manager
            .getRepository(EducationCertification)
            .save({ ...e_c, isDelete: 1 });
        })
      );
    }

    if (cv.work_experiences.length) {
      await Promise.all(
        cv.work_experiences.map(async (w_e) => {
          return await queryRunner.manager
            .getRepository(WorkExperience)
            .save({ ...w_e, isDelete: 1 });
        })
      );
    }

    await queryRunner.manager
      .getRepository(CurriculumVitae)
      .save({ ...cv, isDelete: 1 });

    await queryRunner.commitTransaction();

    return true;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};
