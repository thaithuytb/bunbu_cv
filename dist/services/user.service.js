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
exports.updateUsernameById = exports.getUserById = exports.createUser = exports.createRefreshToken = exports.createToken = exports.getUserByEmail = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const uuidv4_1 = require("uuidv4");
const user_entity_1 = require("../entities/user.entity");
const server_1 = require("../server");
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield server_1.db.getRepository(user_entity_1.User).findOneBy({
            email: email,
        });
    });
}
exports.getUserByEmail = getUserByEmail;
function createToken(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, jsonwebtoken_1.sign)({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
    });
}
exports.createToken = createToken;
function createRefreshToken(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, jsonwebtoken_1.sign)({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h',
        });
    });
}
exports.createRefreshToken = createRefreshToken;
function createUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield server_1.db.getRepository(user_entity_1.User).create({
            email,
            password,
            username: (0, uuidv4_1.uuid)(),
        });
        const user = yield server_1.db.getRepository(user_entity_1.User).save(newUser);
        const access_token = yield createToken(user.id, user.email);
        const refresh_token = yield createRefreshToken(user.id, user.email);
        return {
            access_token,
            refresh_token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        };
    });
}
exports.createUser = createUser;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield server_1.db.getRepository(user_entity_1.User).findOneBy({
            id,
        });
    });
}
exports.getUserById = getUserById;
function updateUsernameById(id, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield server_1.db.getRepository(user_entity_1.User).update(id, { username });
    });
}
exports.updateUsernameById = updateUsernameById;
