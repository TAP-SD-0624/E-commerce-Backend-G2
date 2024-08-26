import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) return res.status(err.statusCode).send(err.message);
    return res.status(500).send('Opss somthing went wrong');
};
