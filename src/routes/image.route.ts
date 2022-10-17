import express, { Request, Response, NextFunction } from 'express';
import * as ImageController from '../controllers/image.controller';
import verifyToken from '../middlewares/verify_token';

const routeImage = express.Router();

routeImage.delete(
  '/:image_id',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  (req: Request, res: Response) => {
    ImageController.deleteImage(req, res);
  }
);

export default routeImage;
