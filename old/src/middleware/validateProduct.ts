import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { query } from 'express-validator';
export const validateId = [
    query('id').isNumeric().notEmpty().isInt({ min: 1 }),
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];
export const validateSearchValue = [
    query('searchValue').isString().notEmpty().trim(),
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];

export const validateProductId = [
    body('productId').notEmpty().isNumeric().isInt({ min: 1 }),
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];

export const validateUserReview = [
    body('productId').notEmpty().isNumeric().isInt({ min: 1 }),
    body('newReview').optional().isString().isLength({ min: 3, max: 200 }).not().matches(/^\s*$/).withMessage('cant be just spaces').trim(),
    body('newRating').optional().isNumeric().isInt({ min: 1, max: 5 }),
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        } else {
            next();
        }
    }
];
export const validateProduct = [
    body('brandId').isInt({ min: 1 }).withMessage('Brand ID must be a positive integer'),
    body('label')
        .notEmpty()
        .withMessage('required')
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 100 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('description')
        .notEmpty()
        .withMessage('required')
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 255 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('price').isFloat({ min: 1 }).withMessage('Price must be a non-negative number'),
    body('discount').isFloat({ min: 0 }).withMessage('Discount must be a non-negative number'),
    body('title')
        .notEmpty()
        .withMessage('required')
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 50 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('imageUrl').notEmpty().isURL().withMessage('Invalid URL format').trim(),
    body('categoriesIdsList').notEmpty().isArray({ min: 1, max: 10 }),
    body('imagesUrlList').notEmpty().isArray({ min: 1, max: 10 }),
    body('tags').notEmpty().isArray({ min: 1, max: 10 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.mapped());
        }
        next();
    }
];
export const validateProductUpdate = [
    body('productId').notEmpty().isNumeric().isInt({ min: 1 }),
    body('brandId').optional().isInt({ min: 1 }).withMessage('Brand ID must be a positive integer'),
    body('label')
        .optional()
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 100 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('description')
        .optional()
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 255 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('price').optional().isFloat({ min: 1 }).withMessage('Price must be a non-negative number'),
    body('discount').optional().isFloat({ min: 0 }).withMessage('Discount must be a non-negative number'),
    body('title')
        .optional()
        .isString()
        .withMessage('must be a string')
        .isLength({ min: 3, max: 50 })
        .not()
        .matches(/^\s*$/)
        .withMessage('cant be just spaces')
        .trim()
        .escape(),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('imageUrl').optional().isURL().withMessage('Invalid URL format').trim(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.mapped());
        }
        next();
    }
];
