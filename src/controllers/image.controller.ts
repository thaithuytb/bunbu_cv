import { Response } from 'express';
import RequestType from '../types/requestType';
import * as ImageService from '../services/image.service';

export const getImages = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  try {
    const images = await ImageService.getImages(user_id as number);
    if (images) {
      return res.status(200).json({
        success: true,
        images,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
