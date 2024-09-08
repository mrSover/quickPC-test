"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const user = req.user;
            if (!user) {
                return next(api_error_1.default.UnauthorizedError());
            }
            if (!roles.includes(user.role)) {
                return next(api_error_1.default.ForbiddenError());
            }
            next();
        }
        catch (e) {
            return next(api_error_1.default.UnauthorizedError());
        }
    };
};
exports.default = roleMiddleware;
