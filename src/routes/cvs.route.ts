import express, { NextFunction, Request, Response } from 'express';
import verifyUser from '../middlewares/verify_user';
import * as CvsController from '../controllers/cvs.controller';
import permissionCvs from '../middlewares/permission_cvs';

const routeCvs = express.Router();

routeCvs.patch(
  '/:cv_id/education_certifications/:education_certification_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyUser(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    CvsController.updateEducationCertification(req, res);
  }
);

export default routeCvs;
