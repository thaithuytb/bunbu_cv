import RequestType from '../types/requestType';
import { NextFunction, Response } from 'express';
import * as CvsService from '../services/cvs.service';

const permissionCvs = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { cv_id } = req.params;
  const user = req.user;
  try {
    if (user?.role == 1) {
      return next();
    }
    const cv = await CvsService.findOneCvByIdWithJoin(+cv_id);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV not found',
      });
    }
    if (cv.user.id !== user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    next();
  } catch (error) {}
};

export default permissionCvs;
