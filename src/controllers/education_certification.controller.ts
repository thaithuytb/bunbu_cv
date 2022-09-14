import { Response } from 'express';
import RequestType from '../types/requestType';
import * as EducationCertificationService from '../services/education_certification.service';

export const deleteEducationCertification = async (
  req: RequestType,
  res: Response
) => {
  const { cv_id, education_certification_id } = req.params;
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
    await EducationCertificationService.deleteOneEducationCertification(
      +education_certification_id
    );
    return res.status(200).json({
      success: true,
      message: 'Delete successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
