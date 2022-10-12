"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.usernameValidator = (0, express_validator_1.body)('username')
    .not()
    .isEmpty()
    .withMessage('username does not Empty');
