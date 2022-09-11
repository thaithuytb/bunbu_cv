import { body } from 'express-validator';

export const emailValidator = body('email')
  .not()
  .isEmpty()
  .withMessage('username does not Empty');

export const passwordValidator = body('password')
  .not()
  .isEmpty()
  .withMessage('password does not Empty');
