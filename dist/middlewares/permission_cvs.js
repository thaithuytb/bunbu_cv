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
const CvsService = __importStar(require("../services/cvs.service"));
const UserService = __importStar(require("../services/user.service"));
const user_entity_1 = require("../entities/user.entity");
const permissionCvs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id } = req.params;
    const { email } = req;
    try {
        const checkUser = yield UserService.getUserByEmail(email);
        if (!checkUser) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }
        const cv = yield CvsService.findCvByIdWithJoin(+cv_id);
        if (!cv) {
            return res.status(404).json({
                success: false,
                message: 'CV not found',
            });
        }
        if (checkUser.role == user_entity_1.UserRole.ADMIN) {
            return next();
        }
        if (cv.user.id !== checkUser.id) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.default = permissionCvs;
