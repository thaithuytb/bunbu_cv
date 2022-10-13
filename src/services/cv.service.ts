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
