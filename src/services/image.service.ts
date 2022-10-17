import { Image } from '../entities/images.entity';
import { User } from '../entities/user.entity';
import { db } from '../server';

export const createImage = async (
  nameFile: string,
  mimetype: string,
  user: User
) => {
  const newImage = new Image();
  newImage.nameFile = nameFile;
  newImage.mimetype = mimetype;
  newImage.user = user;

  const newImageDb = await db.getRepository(Image).create(newImage);
  return await db.getRepository(Image).save(newImageDb);
};
