import { body } from 'express-validator';

export const usernameValidator = body('username')
  .not()
  .isEmpty()
  .withMessage('username does not Empty');
