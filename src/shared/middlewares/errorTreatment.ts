import { Request, Response, NextFunction } from 'express';

import AppError from '@errors/AppError';

export default function errorTreatment(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return response.status(400).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
}
