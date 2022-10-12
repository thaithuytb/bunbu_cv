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
const user_service_1 = require("../services/user.service");
const user_entity_1 = require("../entities/user.entity");
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req;
    if (!email) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    try {
        const checkUser = yield (0, user_service_1.getUserByEmail)(email);
        if (!checkUser || checkUser.role !== user_entity_1.UserRole.ADMIN) {
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
exports.default = verifyAdmin;
