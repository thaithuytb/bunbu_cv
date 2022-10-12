"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routeDetailCv_1 = __importDefault(require("./routeDetailCv"));
const user_route_1 = __importDefault(require("./user.route"));
const route = (app) => {
    app.use('/api/v1/auth', user_route_1.default);
    app.use('/api/v1/cvs', routeDetailCv_1.default);
};
exports.default = route;
