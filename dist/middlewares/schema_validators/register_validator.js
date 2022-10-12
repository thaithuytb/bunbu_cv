"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordValidator = exports.passwordValidator = exports.emailValidator = void 0;
const express_validator_1 = require("express-validator");
exports.emailValidator = (0, express_validator_1.body)('email')
    .not()
    .isEmpty()
    .withMessage('username does not Empty')
    .isEmail()
    .withMessage('email must contain a valid email address');
exports.passwordValidator = (0, express_validator_1.body)('password')
    .not()
    .isEmpty()
    .withMessage('password does not Empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 5 characters long');
exports.confirmPasswordValidator = (0, express_validator_1.body)('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }
    return true;
});
