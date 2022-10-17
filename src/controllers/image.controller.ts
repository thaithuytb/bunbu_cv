import { Response } from 'express';
import RequestType from '../types/requestType';
import * as UserService from '../services/user.service';
import * as ImageService from '../services/image.service';

export const createImage = async (req: RequestType, res: Response) => {
  const file = req.file?.path.slice(
    'src/publics'.length,
    req.file?.path.length
  );
  const { user_id } = req;
  try {
    const user = await UserService.getUserById(user_id as number);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }

    const newImage = await ImageService.createImage(
      file as string,
      req.file?.mimetype as string,
      user
    );
    if (newImage) {
      return res.status(201).json({
        success: true,
        image_id: newImage.id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
