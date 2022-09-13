import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvsService from '../services/cvs.service';

export const create = async (req: RequestType, res: Response) => {
  const payloadBody = req.body;
  const { educationCertification, workExperience, experienceProject } =
    payloadBody;
  if (!(req.user && payloadBody.user_id === req.userId)) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden',
    });
  }
  try {
    const listDetail = await CvsService.detailInfoOfCv({
      educationCertification,
      workExperience,
      experienceProject,
    });
    const newCv = await CvsService.createCv(payloadBody, req.user, listDetail);
    if (newCv) {
      return res.status(201).json({
        success: true,
        cv: newCv,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: error,
    });
  }
};
