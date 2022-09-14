import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
import * as CvsController from '../controllers/education_certication.controller';
import permissionCvs from '../middlewares/permission_cvs';

const routeEducationCertification = express.Router();

routeEducationCertification.post(
  '/:cv_id/education_certifications/create',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    CvsController.createEducationCertification(req, res);
  }
);

export default routeEducationCertification;
