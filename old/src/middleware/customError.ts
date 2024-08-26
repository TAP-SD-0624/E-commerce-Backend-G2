import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    public statusCode: number;
    public errorCode?: string;

    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message); // Call the constructor of the parent Error class
        this.name = this.constructor.name; // Set the error name to the class name
        this.statusCode = statusCode; // Custom property for HTTP status codes
        this.errorCode = errorCode; // Optional custom error code

        // Maintain proper stack trace (only available on V8 engines like Chrome and Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        // Respond with the status code and error message
        res.status(err.statusCode).json({
            error: {
                message: err.message,
                statusCode: err.statusCode,
                errorCode: err.errorCode
            }
        });
    } else {
        // Handle generic errors
        res.status(500).json({
            error: {
                message: 'Internal Server Error',
                statusCode: 500
            }
        });
    }
};
