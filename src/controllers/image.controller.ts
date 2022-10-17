import { Response } from 'express';
import RequestType from '../types/requestType';
import * as ImageService from '../services/image.service';

export const deleteImage = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const { image_id } = req.params;
  try {
    const findImage = await ImageService.getImageWithIdAndUserId(
      +image_id,
      user_id as number
    );
    if (!findImage) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    await ImageService.deleteImage(+image_id, findImage);

    return res.status(204).json({
      success: true,
      message: 'Delete successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
