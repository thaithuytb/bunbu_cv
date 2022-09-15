import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
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

export default routeWorkExperience;
