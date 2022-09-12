import express, { NextFunction, Request, Response } from 'express';
import verifyAdmin from '../middlewares/verity_admin';
import * as RegisterValidator from '../middlewares/schema_validators/register_validator';
import * as validatorLogin from '../middlewares/schema_validators/login_validator';
import * as UserController from '../controllers/user.controller';
import * as InfoValidator from '../middlewares/schema_validators/info_validator';
import validateRequest from '../middlewares/validator_request';
import verifyToken from '../middlewares/verify_token';

const routeUser = express.Router();

routeUser.post(
  '/register',
  verifyToken,
  function (req: Request, res: Response, next: NextFunction) {
    verifyAdmin(req, res, next);
  },
  RegisterValidator.emailValidator,
  RegisterValidator.passwordValidator,
  RegisterValidator.confirmPasswordValidator,
  validateRequest,
  function (req: Request, res: Response) {
    UserController.register(req, res);
  }
);

routeUser.post(
  '/login',
  validatorLogin.emailValidator,
  validatorLogin.passwordValidator,
  validateRequest,
  (req: Request, res: Response) => {
    UserController.login(req, res);
  }
);

routeUser.patch(
  '/info',
  InfoValidator.usernameValidator,
  validateRequest,
  verifyToken,
  (req: Request, res: Response) => {
    UserController.info(req, res);
  }
);

export default routeUser;
