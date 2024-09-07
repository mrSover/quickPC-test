import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';

interface CustomRequest extends Request {
    user?: any; // Вказати правильний тип для userData, якщо відомо
}

const roleMiddleware = (roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        
    if (req.method === "OPTIONS") {
        next();
    }

    try{
        const user = req.user; 
            if (!user) {
                return next(ApiError.UnauthorizedError());
            }

            if (!roles.includes(user.role)) {
                return next(ApiError.ForbiddenError());
            }

        next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}

export default roleMiddleware;