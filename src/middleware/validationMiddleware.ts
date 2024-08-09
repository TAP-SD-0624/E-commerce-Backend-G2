import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { checkIfUserEmailExists } from '../utils/database';
export let createUserValidation = [
    body('firstName')
        .not()
        .isEmpty()
        .withMessage('missing first name!')
        .isString()
        .exists()
        .bail()
        .toLowerCase()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required for first name!'),
    body('lastName')
        .not()
        .isEmpty()
        .withMessage('missing last name!')
        .exists()
        .bail()
        .toLowerCase()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required for last name'),
    body('email')
        .not()
        .isEmpty()
        .withMessage('missing email address!')
        .isString()
        .exists()
        .bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email address!')
        .custom(async (value) => {
            if (await checkIfUserEmailExists(value)) {
                throw new Error('E-mail already in use');
            }
        }),
    body('password').not().isEmpty().withMessage('password cant be empty!').isStrongPassword(),
    body('phone').not().isEmpty().withMessage('phone number cant be empty!'),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
        } else {
            next();
        }
    }
];
