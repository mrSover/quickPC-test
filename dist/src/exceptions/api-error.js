"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = 'ApiError';
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User has not been authorized');
    }
    static ForbiddenError() {
        return new ApiError(401, 'User do not have permission to access this resource');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
exports.default = ApiError;
