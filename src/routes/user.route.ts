import express, { Request, Response } from 'express';
import * as UserController from '../controllers/user.controller';
import validateRequest from '../middlewares/validator_request';
import * as validatorLogin from '../middlewares/schema_validators/login_validator';

const routeUser = express.Router();

routeUser.post(
  '/login',
  validatorLogin.emailValidator,
  validatorLogin.passwordValidator,
  validateRequest,
  (req: Request, res: Response) => {
    UserController.login(req, res);
  }
);

export default routeUser;
