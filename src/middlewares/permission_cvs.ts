import RequestType from '../types/requestType';
import { NextFunction, Response } from 'express';
import * as CvsService from '../services/cvs.service';
import * as UserService from '../services/user.service';
import { UserRole } from '../entities/user.entity';

const permissionCvs = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { cv_id } = req.params;
  const { email } = req;
  try {
    const checkUser = await UserService.getUserByEmail(email as string);
    if (!checkUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const cv = await CvsService.findCvByIdWithJoin(+cv_id);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV not found',
      });
    }
    if (checkUser.role == UserRole.ADMIN) {
      return next();
    }
    if (cv.user.id !== checkUser.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export default permissionCvs;
