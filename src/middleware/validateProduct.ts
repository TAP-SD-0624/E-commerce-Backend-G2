import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// export const validateProduct = [
//     body('brandId')
//         .isInt({ min: 1 }).withMessage('Brand ID must be a positive integer'),
//
//     body('label')
//         .notEmpty().withMessage('Label is required')
//         .isString().withMessage('Label must be a string')
//         .trim()
//         .escape(),
//
//     body('description')
//         .optional()
//         .isString().withMessage('Description must be a string')
//         .trim()
//         .escape(),
//
//     body('price')
//         .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
//
//     body('discount')
//         .optional()
//         .isFloat({ min: 0 }).withMessage('Discount must be a non-negative number'),
//
//     body('title')
//         .notEmpty().withMessage('Title is required')
//         .isString().withMessage('Title must be a string')
//         .trim()
//         .escape(),
//
//     body('quantity')
//         .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
//
//     body('imageUrl')
//         .optional()
//         .isURL().withMessage('Invalid URL format')
//         .trim(),
//
//     body('categoriesIds')
//         .optional()
//         .isArray().withMessage('Categories IDs must be an array of objects'),
//
//     body('imagesUrls')
//         .optional()
//         .isArray().withMessage('Images URLs must be an array of objects'),
//
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];