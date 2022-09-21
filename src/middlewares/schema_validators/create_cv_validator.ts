import { body } from 'express-validator';

export const nameValidator = body('name')
  .not()
  .isEmpty()
  .withMessage('name does not Empty');

export const nationalityValidator = body('nationality')
  .not()
  .isEmpty()
  .withMessage('nationality does not Empty');

export const genderValidator = body('gender')
  .not()
  .isEmpty()
  .withMessage('gender does not Empty');
