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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInfo = exports.login = exports.register = void 0;
const argon2_1 = require("argon2");
const UserService = __importStar(require("../services/user.service"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const findUser = yield UserService.getUserByEmail(email);
        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }
        const hashPassword = yield (0, argon2_1.hash)(password);
        const { access_token, refresh_token, user } = yield UserService.createUser(email, hashPassword);
        return res.status(201).json({
            success: true,
            access_token,
            refresh_token,
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({ errors: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email/password supplied',
            });
        }
        const verifyPassword = yield (0, argon2_1.verify)(user.password, password);
        if (!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email/password supplied',
            });
        }
        const access_token = yield UserService.createToken(user.id, user.email);
        const refresh_token = yield UserService.createRefreshToken(user.id, user.email);
        return res.status(200).json({
            success: true,
            access_token,
            refresh_token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.login = login;
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req;
    const { username } = req.body;
    if (!user_id) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    try {
        const user = yield UserService.getUserById(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        yield UserService.updateUsernameById(user_id, username);
        return res.status(200).json({
            success: true,
            message: 'User already updated',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.updateInfo = updateInfo;
