"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_admin_1 = __importDefault(require("../middlewares/verify_admin"));
const UserController = __importStar(require("../controllers/user.controller"));
const RegisterValidator = __importStar(require("../middlewares/schema_validators/register_validator"));
const LoginValidator = __importStar(require("../middlewares/schema_validators/login_validator"));
const InfoValidator = __importStar(require("../middlewares/schema_validators/info_validator"));
const validator_request_1 = __importDefault(require("../middlewares/validator_request"));
const verify_token_1 = __importDefault(require("../middlewares/verify_token"));
const routeUser = express_1.default.Router();
routeUser.post('/register', verify_token_1.default, function (req, res, next) {
    (0, verify_admin_1.default)(req, res, next);
}, RegisterValidator.emailValidator, RegisterValidator.passwordValidator, RegisterValidator.confirmPasswordValidator, validator_request_1.default, function (req, res) {
    UserController.register(req, res);
});
routeUser.post('/login', LoginValidator.emailValidator, LoginValidator.passwordValidator, validator_request_1.default, (req, res) => {
    UserController.login(req, res);
});
routeUser.patch('/info', InfoValidator.usernameValidator, validator_request_1.default, verify_token_1.default, (req, res) => {
    UserController.updateInfo(req, res);
});
exports.default = routeUser;
