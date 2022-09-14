import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvsService from '../services/cvs.service';
import * as EducationCertificationService from '../services/education_certification.service';

export const createEducationCertification = async (
  req: RequestType,
  res: Response
) => {
  const { cv_id } = req.params;
  const payloadBody = req.body;

  try {
    const cv = await CvsService.findOneCvById(+cv_id);
    if (cv) {
      const educationCertification =
        await EducationCertificationService.createOneEducationCertification(
          payloadBody,
          cv
        );
      if (educationCertification) {
        return res.status(201).json({
          success: true,
          educationCertification,
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: 'Cv not found',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
