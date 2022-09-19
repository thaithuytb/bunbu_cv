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

export const updateWorkExperience = async (req: RequestType, res: Response) => {
  const { cv_id, work_experience_id } = req.params;
  const payloadBody = req.body;
  try {
    const findWorkExperience =
      await WorkExperienceService.findWorkExperienceByIdAndCvId(
        +work_experience_id,
        +cv_id
      );
    if (!findWorkExperience) {
      return res.status(404).json({
        success: false,
        message: 'Work Experience not found',
      });
    }
    const newWorkExperience =
      await WorkExperienceService.updateWorkExperienceById(
        +work_experience_id,
        payloadBody,
        findWorkExperience
      );
    if (newWorkExperience) {
      return res.status(200).json({
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

export const deleteWorkExperience = async (req: RequestType, res: Response) => {
  const { cv_id, work_experience_id } = req.params;
  try {
    const findWorkExperience =
      await WorkExperienceService.findWorkExperienceByIdAndCvId(
        +work_experience_id,
        +cv_id
      );
    if (!findWorkExperience) {
      return res.status(404).json({
        success: false,
        message: 'Work Experience not found',
      });
    }

    await WorkExperienceService.deleteWorkExperienceById(+work_experience_id);
    return res.status(204).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
