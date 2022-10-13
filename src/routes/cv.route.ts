import express, { NextFunction, Request, Response } from 'express';
import verifyToken from '../middlewares/verify_token';
import * as CvController from '../controllers/cv.controller';

const routeCv = express.Router();

routeCv.delete(
  '/:cv_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    CvController.deleteCv(req, res);
  }
);

export default routeCv;
