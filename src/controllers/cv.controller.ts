import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvService from '../services/cv.service';

export const deleteCv = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const { cv_id } = req.params;
  try {
    const checkCv = await CvService.findCvWithAllRelationByIdAndUserId(
      +cv_id,
      user_id as number
    );
    if (!checkCv) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }

    const checkDeleteCv = await CvService.deleteCv(checkCv);
    if (checkDeleteCv) {
      return res.status(204).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
