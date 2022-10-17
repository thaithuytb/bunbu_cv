import { Image } from '../entities/image.entity';
import { db } from '../server';

export const getImages = async (user_id: number) => {
  return await db.getRepository(Image).find({
    where: {
      user: {
        id: user_id,
      },
    },
  });
};
