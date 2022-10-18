import { db } from '../server';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { EducationCertification } from '../entities/education_certification.entity';
import { WorkExperience } from '../entities/work_experience.entity';
import { ExperienceProject } from '../entities/experience_project.entity';
import { User } from '../entities/user.entity';
import { Image } from '../entities/image.entity';

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

export const createCv = async (
  user: User,
  payload: CurriculumVitae,
  image: Image | null
) => {
  const queryRunner = await db.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const newCv = new CurriculumVitae();
    newCv.user = user;
    newCv.name = payload.name ? payload.name : '';
    newCv.gender = payload.gender ? payload.gender : '';
    newCv.nationality = payload.nationality ? payload.nationality : '';
    newCv.objective = payload.objective ? payload.objective : '';
    newCv.summary = payload.summary ? payload.summary : '';
    image ? (newCv.image = image) : null;

    const createCv = await queryRunner.manager
      .getRepository(CurriculumVitae)
      .save(newCv);
    if (payload.education_certifications) {
      //no has await to run parallel with work_experiences
      Promise.all(
        payload.education_certifications.map(async (e_c) => {
          const newEC = new EducationCertification();
          newEC.curriculum_vitae = createCv;
          newEC.major = e_c.major ? e_c.major : '';
          newEC.name = e_c.name ? e_c.name : '';
          newEC.time = e_c.time ? e_c.time : '';
          return await queryRunner.manager
            .getRepository(EducationCertification)
            .save(newEC);
        })
      );
    }

    if (payload.work_experiences) {
      await Promise.all(
        payload.work_experiences.map(async (w_e) => {
          const newWE = new WorkExperience();
          newWE.curriculum_vitae = createCv;
          newWE.company = w_e.company ? w_e.company : '';
          newWE.job_description = w_e.job_description
            ? w_e.job_description
            : '';
          newWE.time = w_e.time ? w_e.time : '';
          newWE.job_title = w_e.job_title ? w_e.job_title : '';

          return await queryRunner.manager
            .getRepository(WorkExperience)
            .save(newWE);
        })
      );
    }

    if (payload.experience_projects) {
      await Promise.all(
        payload.experience_projects.map(async (e_p, index) => {
          const checkWE = await queryRunner.manager
            .getRepository(WorkExperience)
            .findOneBy(e_p.work_experience);
          if (!checkWE) {
            throw new Error(
              `Cant not found work_experience of ${
                index + 1
              }th experience_projects`
            );
          }
          const newEP = new ExperienceProject();
          newEP.curriculum_vitae = createCv;
          newEP.project_description = e_p.project_description
            ? e_p.project_description
            : '';
          newEP.work_experience = checkWE;
          newEP.name = e_p.name ? e_p.name : '';
          newEP.programming_languages = e_p.programming_languages
            ? e_p.programming_languages
            : '';
          newEP.responsibilities = e_p.responsibilities
            ? e_p.responsibilities
            : '';
          newEP.role = e_p.role ? e_p.role : '';
          newEP.time = e_p.time ? e_p.time : '';

          return await queryRunner.manager
            .getRepository(ExperienceProject)
            .save({ ...newEP, work_experience_id: checkWE.id });
        })
      );
    }
    await queryRunner.commitTransaction();
    //Can return payload
    return await db.getRepository(CurriculumVitae).findOne({
      where: { ...createCv },
      relations: [
        'image',
        'education_certifications',
        'work_experiences',
        'experience_projects',
      ],
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};
