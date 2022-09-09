import { body } from 'express-validator';

export const emailValidator = body('email')
  .not()
  .isEmpty()
  .withMessage('username does not Empty')
  .isEmail()
  .withMessage('email must contain a valid email address');

export const passwordValidator = body('password')
  .not()
  .isEmpty()
  .withMessage('password does not Empty')
  .isLength({ min: 6 })
  .withMessage('password must be at least 5 characters long');

export const confirmPasswordValidator = body('confirm_password').custom(
  (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }
);
