import { Image } from '../entities/image.entity';
import { db } from '../server';

export const getImageWithIdAndUserId = async (id: number, user_id: number) => {
  return await db.getRepository(Image).findOne({
    where: {
      id: id,
      user: {
        id: user_id,
      },
    },
  });
};

export const deleteImage = async (id: number, image: Image) => {
  return await db.getRepository(Image).save({ ...image, id, isDelete: 1 });
};
