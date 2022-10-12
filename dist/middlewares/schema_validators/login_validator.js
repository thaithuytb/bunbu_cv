"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.emailValidator = void 0;
const express_validator_1 = require("express-validator");
exports.emailValidator = (0, express_validator_1.body)('email')
    .not()
    .isEmpty()
    .withMessage('username does not Empty');
exports.passwordValidator = (0, express_validator_1.body)('password')
    .not()
    .isEmpty()
    .withMessage('password does not Empty');
