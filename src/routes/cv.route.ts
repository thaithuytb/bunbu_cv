import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
import * as CvController from '../controllers/cv.controller';
import validateRequest from '../middlewares/validator_request';
import * as CreateCvValidator from '../middlewares/schema_validators/create_cv_validator';

const routeCv = express.Router();

routeCv.post(
  '/create',
  CreateCvValidator.nameValidator,
  CreateCvValidator.nationalityValidator,
  CreateCvValidator.genderValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    CvController.createCv(req, res);
  }
);

export default routeCv;
