import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import {db} from "../database";


export const validateUser = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .trim().escape(),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .trim().escape(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
        .withMessage('missing email address!')
        .isString()
        .exists()
        .bail()
        .trim()
        .normalizeEmail()
        .custom(async (value) => {
            if (await checkIfUserEmailExists(value)) {
                throw new Error('E-mail already in use');
            }
        }),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),

    body('phone')
        .optional()
        .isString().withMessage('Phone number must be a string')
        .trim().escape(),

    body('DOB')
        .optional()
        .isDate().withMessage('Invalid date format')
        .toDate(),

    body('imageUrl')
        .optional()
        .isURL().withMessage('Invalid URL format')
        .trim(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Define validation and sanitization for login
export const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export async function findUserByEmail(email: string): Promise<null | {}> {
    return await db.Users.findOne({
        where: {email}
    });
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    const results = await findUserByEmail(email);
    return !!results;
}