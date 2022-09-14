import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
import permissionCvs from '../middlewares/permission_cvs';
import * as WorkExperienceController from '../controllers/work_experience.controller';
import * as EducationCertificationController from '../controllers/education_certification.controller';

const routeDetailCv = express.Router();

routeDetailCv.post(
  '/:cv_id/work_experiences/create',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    WorkExperienceController.createWorkExperience(req, res);
  }
);

routeDetailCv.patch(
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

routeDetailCv.delete(
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

routeDetailCv.post(
  '/:cv_id/education_certifications/create',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    EducationCertificationController.createEducationCertification(req, res);
  }
);

routeDetailCv.patch(
  '/:cv_id/education_certifications/:education_certification_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    permissionCvs(req, res, next);
  },
  (req: Request, res: Response) => {
    EducationCertificationController.updateEducationCertification(req, res);
  }
);

routeDetailCv.delete(
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

export default routeDetailCv;
