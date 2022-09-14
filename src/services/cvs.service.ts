import { db } from '../server';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';

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
