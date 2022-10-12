import { Response } from 'express';
import RequestType from '../types/requestType';
import * as UserService from '../services/user.service';
import * as CvService from '../services/cv.service';

export const createCv = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const payload = req.body;
  try {
    const user = await UserService.getUserById(user_id as number);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const newCv = await CvService.createCv(user, payload);
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
