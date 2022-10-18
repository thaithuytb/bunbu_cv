import { Response } from 'express';
import RequestType from '../types/requestType';
import * as UserService from '../services/user.service';
import * as CvService from '../services/cv.service';
import * as ImageService from '../services/image.service';

export const createCv = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const payloadCv = req.body.cv;
  const image_id = req.body.image_id;
  try {
    const user = await UserService.getUserById(user_id as number);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }

    const image = image_id ? await ImageService.getImageById(+image_id) : null;

    const newCv = await CvService.createCv(user, payloadCv, image);
    if (newCv) {
      return res.status(201).json({
        success: true,
        cv: newCv,
      });
    }
  } catch (error) {
    const regex = /.*Cant not found work_experience of[^]*/g;

    if (regex.test(error as string)) {
      return res.status(404).json({
        success: false,
        message: 'Cant not found work_experience',
      });
    }
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
