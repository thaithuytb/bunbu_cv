import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as ImageController from '../controllers/image.controller';
import verifyToken from '../middlewares/verify_token';

const routeImage = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/publics/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error?: any, boolean?: boolean) => void
) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Type file must is png or jpeg'), false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

routeImage.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
  },
  upload.single('image'),
  (req: Request, res: Response) => {
    ImageController.createImage(req, res);
  }
);

export default routeImage;
