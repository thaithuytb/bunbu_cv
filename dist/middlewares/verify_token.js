"use strict";
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
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqHeader = req.headers.authorization;
    const token = reqHeader && reqHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    try {
        const decodeToken = (yield (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET));
        if (!decodeToken.id || !decodeToken.email) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        req.user_id = decodeToken.id;
        req.email = decodeToken.email;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token expires',
        });
    }
});
exports.default = verifyToken;
