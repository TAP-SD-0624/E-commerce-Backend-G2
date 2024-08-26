import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// validation rules for checkout
export const validateCheckout = [
    body('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long')
        .trim()
        .escape(),

    body('street')
        .notEmpty()
        .withMessage('Street address is required')
        .isLength({ min: 5 })
        .withMessage('Street address must be at least 5 characters long')
        .trim()
        .escape(),

    body('city')
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2 })
        .withMessage('City must be at least 2 characters long')
        .trim()
        .escape(),

    body('mobile')
        .notEmpty()
        .withMessage('Mobile number is required')
        .isLength({ min: 10 })
        .withMessage('mobile must be at least 10 characters long')
        .trim()
        .escape(),

    body('state')
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 2 })
        .withMessage('State must be at least 2 characters long')
        .trim()
        .escape(),

    body('zipcode').notEmpty().withMessage('Zipcode is required').isPostalCode('any').withMessage('Invalid zipcode format').trim().escape(),
    body('paymentStatus')
        .notEmpty()
        .withMessage('paymentStatus is required')
        .isLength({ min: 4 })
        .withMessage('paymentStatus must be at least 4 characters long')
        .trim()
        .escape(),
    body('totalPrice')
        .notEmpty()
        .withMessage('totalPrice is required')
        .isFloat({ min: 0 })
        .withMessage('totalPrice must be more than 0')
        .trim()
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];

export const VaildateMostBought = [
    body('startDate').notEmpty().withMessage('startDate is required').isDate().withMessage('Invalid date format').toDate().trim().escape(),
    body('endDate').notEmpty().withMessage('endDate is required').isDate().withMessage('Invalid date format').toDate().trim().escape(),
    body('minOrderCount')
        .notEmpty()
        .withMessage('minOrderCount is required')
        .isInt({ min: 0 })
        .withMessage('minOrderCount must be more than -1')
        .trim()
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];
export const VaildateNotBought = [
    body('daysToConsiderNew')
        .notEmpty()
        .withMessage('daysToConsiderNew is required')
        .isInt({ min: 0 })
        .withMessage('daysToConsiderNew must be more than -1')
        .trim()
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];

export const itemsToDrop = [
    body('daysToConsiderNew')
        .notEmpty()
        .withMessage('daysToConsiderNew is required')
        .isInt({ min: 0 })
        .withMessage('daysToConsiderNew must be more than -1')
        .trim()
        .escape(),
    body('units').notEmpty().withMessage('units is required').isInt({ min: 0 }).withMessage('units must be more than -1').trim().escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];

export const VaildateRegion = [
    body('state')
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 2 })
        .withMessage('State must be at least 2 characters long')
        .trim()
        .escape(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];
