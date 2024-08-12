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
