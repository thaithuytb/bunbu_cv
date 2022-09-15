import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
import permissionCvs from '../middlewares/permission_cvs';
import * as WorkExperienceController from '../controllers/work_experience.controller';

const routeWorkExperience = express.Router();

routeWorkExperience.post(
  '/:cv_id/work_experiences/create',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    WorkExperienceController.createWorkExperience(req, res);
  }
);

routeWorkExperience.patch(
  '/:cv_id/work_experiences/:work_experience_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    WorkExperienceController.updateWorkExperience(req, res);
  }
);

routeWorkExperience.delete(
  '/:cv_id/work_experiences/:work_experience_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    WorkExperienceController.deleteWorkExperience(req, res);
  }
);

export default routeWorkExperience;
