import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvsService from '../services/cvs.service';
import * as WorkExperienceService from '../services/work_experience.service';

export const createWorkExperience = async (req: RequestType, res: Response) => {
  const { cv_id } = req.params;
  const { user_id } = req;
  const payloadBody = req.body;
  try {
    const checkCv = await CvsService.findCvByIdAndUserId(
      +cv_id,
      user_id as number
    );
    if (!checkCv) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const newWorkExperience = await WorkExperienceService.createWorkExperience(
      payloadBody,
      checkCv
    );
    if (newWorkExperience) {
      return res.status(201).json({
        success: true,
        workExperience: newWorkExperience,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
