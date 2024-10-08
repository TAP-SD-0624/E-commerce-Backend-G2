import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';
import { checkIfUserEmailExists } from '../utils/UsersUtils';

export const validateUser = [
    body('firstName').notEmpty().withMessage('First name is required').isString().withMessage('First name must be a string').trim().escape(),
    body('lastName').notEmpty().withMessage('Last name is required').isString().withMessage('Last name must be a string').trim().escape(),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .isString()
        .trim()
        .normalizeEmail()
        .custom(async (value) => {
            if (await checkIfUserEmailExists(value)) {
                throw new CustomError('E-mail already in use', 400);
            }
        }),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').optional().isString().withMessage('Phone number must be a string').trim().escape(),
    body('DOB').optional().isDate().withMessage('Invalid date format').toDate(),
    body('imageUrl').optional().isURL().withMessage('Invalid URL format').trim(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorObjects = errors.array().map((err) => ({
                message: err.msg
            }));

            return res.status(422).json({
                errors: errorObjects
            });
        }
        next();
    }
];
export const validateUpdateUser = [
    body('firstName').optional().isString().isLength({ min: 3, max: 200 }).not().matches(/^\s*$/).withMessage('cant be just spaces').trim().escape(),
    body('lastName').optional().isString().isLength({ min: 3, max: 200 }).not().matches(/^\s*$/).withMessage('cant be just spaces').trim().escape(),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
    body('phone').optional().isString().isLength({ min: 3, max: 200 }).not().matches(/^\s*$/).withMessage('cant be just spaces').trim().escape(),
    body('DOB').optional().isDate().withMessage('Invalid date format'),
    body('imageUrl').optional().isURL().withMessage('Invalid URL format').trim(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorObjects = errors.array().map((err) => ({
                // field: err.,  // @todo should return the field here
                message: err.msg
            }));
            return res.status(422).json({
                errors: errorObjects
            });
        }
        next();
    }
];

// Define validation and sanitization for login
// export const validateLogin = [
//     body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),

//     body('password')
//         .notEmpty()
//         .withMessage('Password is required')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long')
//         .trim(),

//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             const errorObjects = errors.array().map((err) => ({
//                 message: err.msg
//             }));

//             return res.status(422).json({
//                 errors: errorObjects
//             });
//         }
//         next();
//     }
// ];
export const loginValidate = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .isString()
        .trim()
        .normalizeEmail()
        .custom(async (value) => {
            if (!(await checkIfUserEmailExists(value))) {
                throw new CustomError('E-mail doesnt exist', 401);
            }
        }),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorObjects = errors.array().map((err) => ({
                message: err.msg
            }));
            return res.status(422).json({
                errors: errorObjects
            });
        }
        next();
    }
];
