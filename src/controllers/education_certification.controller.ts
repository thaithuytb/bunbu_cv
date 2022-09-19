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

export const updateEducationCertification = async (
  req: RequestType,
  res: Response
) => {
  const { cv_id, education_certification_id } = req.params;
  const payloadBody = req.body;

  try {
    const findEducationCertification =
      await EducationCertificationService.findEducationCertificationByIdAndCvId(
        +education_certification_id,
        +cv_id
      );
    if (!findEducationCertification) {
      return res.status(404).json({
        success: false,
        message: 'Education Certification not found',
      });
    }
    const newEducationCertification =
      await EducationCertificationService.updateEducationCertificationById(
        +education_certification_id,
        payloadBody,
        findEducationCertification
      );
    if (newEducationCertification) {
      return res.status(200).json({
        success: true,
        education_certification: newEducationCertification,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
