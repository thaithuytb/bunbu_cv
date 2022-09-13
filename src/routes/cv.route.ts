import express from 'express';
import verifyToken from '../middlewares/verify_token';
import verifyUser from '../middlewares/verify_user';
import * as CvsController from '../controllers/cvs.controller';

const routeCv = express.Router();

routeCv.post('/create', verifyToken, verifyUser, (req, res) => {
  CvsController.create(req, res);
});

export default routeCv;
