import { db } from '../server';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { EducationCertification } from '../entities/education_certification.entity';
import { WorkExperience } from '../entities/work_experience.entity';
import { ExperienceProject } from '../entities/experience_project.entity';

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

export const getCvs = async (
  user_id: number,
  sort: 'ASC' | 'DESC',
  page: number,
  q: any
) => {
  const limitPage = 4;
  const builder = db.getRepository(CurriculumVitae).createQueryBuilder('cv');
  builder.leftJoinAndSelect(
    'cv.education_certifications',
    'e_c',
    'cv.id = e_c.cv_id'
  );
  builder.leftJoinAndSelect('cv.work_experiences', 'w_e', 'cv.id = w_e.cv_id');
  builder.leftJoinAndSelect(
    'cv.experience_projects',
    'e_p',
    'cv.id = e_p.cv_id'
  );
  builder.where('cv.user.id = :id', {
    id: user_id,
  });
  builder.andWhere(
    'cv.name like :name and w_e.company like :company and e_p.programming_languages like :p_l',
    {
      name: q.name ? `%${q.name}%` : '%',
      company: q.company ? `%${q.company}%` : '%',
      p_l: q.language ? `%${q.language}%` : '%',
    }
  );
  builder.orderBy('cv.id', sort);
  builder.skip((page - 1) * limitPage).take(limitPage);

  return {
    data: await builder.getMany(),
    page: await builder.getCount(),
  };
};

export const updateCv = async (
  cv: CurriculumVitae,
  cv_update: CurriculumVitae
) => {
  const queryRunner = await db.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager
      .getRepository(CurriculumVitae)
      .save({
        name: cv_update.name,
        nationality: cv_update.nationality,
        gender: cv_update.gender,
        objective: cv_update.objective,
        summary: cv_update.summary,
        id: cv.id,
      });
    //education_certification
    if (cv_update.education_certifications.length) {
      Promise.all(
        cv_update.education_certifications.map(
          async (e_c: EducationCertification | any) => {
            if (e_c.isDelete) {
              return queryRunner.manager
                .getRepository(EducationCertification)
                .save({ ...e_c, isDelete: 1 });
            }
            if (!e_c.id) {
              const newEC = new EducationCertification();
              newEC.curriculum_vitae = cv;
              newEC.major = e_c.major ? e_c.major : '';
              newEC.name = e_c.name ? e_c.name : '';
              newEC.time = e_c.time ? e_c.time : '';
              return await queryRunner.manager
                .getRepository(EducationCertification)
                .save(newEC);
            }
            return queryRunner.manager
              .getRepository(EducationCertification)
              .save(e_c);
          }
        )
      );
    }
    //remove and update experience_project
    if (cv_update.experience_projects.length) {
      await Promise.all(
        cv_update.experience_projects.map(
          async (e_p: ExperienceProject | any) => {
            if (e_p.isDelete) {
              return queryRunner.manager
                .getRepository(ExperienceProject)
                .save({ ...e_p, isDelete: 1 });
            }
            if (e_p.id) {
              return queryRunner.manager
                .getRepository(ExperienceProject)
                .save(e_p);
            }
          }
        )
      );
    }
    //work_experiences
    if (cv_update.work_experiences.length) {
      await Promise.all(
        cv_update.work_experiences.map(async (w_e: WorkExperience | any) => {
          if (w_e.isDelete) {
            return queryRunner.manager
              .getRepository(WorkExperience)
              .save({ ...w_e, isDelete: 1 });
          }
          if (!w_e.id) {
            const newWE = new WorkExperience();
            newWE.curriculum_vitae = cv;
            newWE.company = w_e.company ? w_e.company : '';
            newWE.job_description = w_e.job_description
              ? w_e.job_description
              : '';
            newWE.time = w_e.time ? w_e.time : '';
            newWE.job_title = w_e.job_title ? w_e.job_title : '';

            return await queryRunner.manager
              .getRepository(WorkExperience)
              .save(newWE);
          }
          return queryRunner.manager.getRepository(WorkExperience).save(w_e);
        })
      );
    }
    //create experience_project
    if (cv_update.experience_projects.length) {
      await Promise.all(
        cv_update.experience_projects.map(
          async (e_p: ExperienceProject | any, index) => {
            if (!e_p.isDelete && !e_p.id) {
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
              newEP.curriculum_vitae = cv;
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
            }
          }
        )
      );
    }

    await queryRunner.commitTransaction();
    //Can return payload
    return await db.getRepository(CurriculumVitae).findOne({
      where: { id: cv.id },
      relations: [
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
