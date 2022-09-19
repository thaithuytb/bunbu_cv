import { Response } from 'express';
import RequestType from '../types/requestType';
import * as ExperienceProjectService from '../services/experience_project.service';
import * as WorkExperienceService from '../services/work_experience.service';
import * as CvsService from '../services/cvs.service';

export const createExperienceProject = async (
  req: RequestType,
  res: Response
) => {
  const { cv_id, work_experience_id } = req.params;
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
    const checkWorkExperience =
      await WorkExperienceService.findWorkExperienceByIdAndCvId(
        +work_experience_id,
        checkCv.id
      );
    if (!checkWorkExperience) {
      return res.status(404).json({
        success: false,
        message: 'Work Experience not found',
      });
    }
    const newExperienceProject =
      await ExperienceProjectService.createExperienceProject(
        payloadBody,
        checkCv,
        checkWorkExperience
      );
    return res.status(201).json({
      success: true,
      experience_project: newExperienceProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
