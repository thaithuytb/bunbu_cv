import express, { Request, Response } from 'express';
import * as UserController from '../controllers/user.controller';
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '../middlewares/schema_validators/register_validator';
import validateRequest from '../middlewares/validator_request';

const routeUser = express.Router();

routeUser.post(
  '/register',
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  validateRequest,
  function (req: Request, res: Response) {
    UserController.register(req, res);
  }
);

export default routeUser;
