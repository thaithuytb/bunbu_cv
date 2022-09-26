import { Response } from 'express';
import RequestType from '../types/requestType';
import * as CvService from '../services/cv.service';
import * as UserService from '../services/user.service';

export const getCvById = async (req: RequestType, res: Response) => {
  const { cv_id } = req.params;
  const { user_id } = req;
  try {
    const cv = await CvService.findCvByIdAndUserIdWithRelation(
      +cv_id,
      user_id as number
    );
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'Cv not found',
      });
    }
    return res.status(200).json({
      success: true,
      cv,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export const getCvs = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const { sort, page, ...q } = req.query;
  try {
    const sortCv = sort
      ? sort.toString().toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC'
      : 'DESC';
    const pageCv = page
      ? parseInt(page.toString()) <= 1
        ? 1
        : parseInt(page.toString())
      : 1;

    const isAdmin = await UserService.isAdmin(user_id as number);
    const cv = await CvService.getCvs(
      isAdmin ? null : (user_id as number),
      sortCv,
      pageCv,
      q
    );
    if (cv.data.length === 0 || !cv) {
      return res.status(404).json({
        success: false,
        message: 'Cv not found',
      });
    }
    return res.status(200).json({
      success: true,
      cv: cv.data,
      page: cv.page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export const updateCv = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const { cv_id } = req.params;
  const payload = req.body;
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

    const cvUpdate = await CvService.updateCv(checkCv, payload);
    if (cvUpdate) {
      return res.status(200).json({
        success: true,
        cv: cvUpdate,
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
