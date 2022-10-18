import { body } from 'express-validator';

export const nameValidator = body('cv.name')
  .not()
  .isEmpty()
  .withMessage('name does not Empty');

export const nationalityValidator = body('cv.nationality')
  .not()
  .isEmpty()
  .withMessage('nationality does not Empty');

export const genderValidator = body('cv.gender')
  .not()
  .isEmpty()
  .withMessage('gender does not Empty');
