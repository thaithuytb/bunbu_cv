import { Image } from '../entities/image.entity';
import { db } from '../server';

export const getImageById = async (id: number) => {
  return await db.getRepository(Image).findOneBy({ id });
};
