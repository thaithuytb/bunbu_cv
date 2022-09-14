import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvsService from '../services/cvs.service';
import * as EducationCertificationService from '../services/education_certification.service';

export const createEducationCertification = async (
  req: RequestType,
  res: Response
) => {
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

    const educationCertification =
      await EducationCertificationService.createEducationCertification(
        payloadBody,
        checkCv
      );
    if (educationCertification) {
      return res.status(201).json({
        success: true,
        educationCertification,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
