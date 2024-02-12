import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

class ErrorHandler extends Error
{
    public statusCode: number;
    public success: boolean;

    constructor(success: boolean, message: string, statusCode: number)
    {
        super(message);
        this.success = success;
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) =>
{
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;
    logger.error(err);
    return res.status(err.statusCode).json({
        success: err.success || false,
        message: err.message,
    });
};

export default ErrorHandler;
