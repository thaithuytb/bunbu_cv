import express, { NextFunction, Request, Response } from 'express';
import * as EducationCertificationController from '../controllers/education_certification.controller';
import verifyToken from '../middlewares/verify_token';
import permissionCvs from '../middlewares/permission_cvs';

const routeEducationCertification = express.Router();

routeEducationCertification.delete(
  '/:cv_id/education_certifications/:education_certification_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    EducationCertificationController.deleteEducationCertification(req, res);
  }
);

export default routeEducationCertification;
