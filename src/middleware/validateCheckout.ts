// import { body, validationResult } from 'express-validator';
// import { Request, Response, NextFunction } from 'express';

// validation rules for checkout
// export const validateCheckout = [
//     body('fullName')
//         .notEmpty().withMessage('Full name is required')
//         .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long')
//         .trim()
//         .escape(),
//
//     body('streetAddress')
//         .notEmpty().withMessage('Street address is required')
//         .isLength({ min: 5 }).withMessage('Street address must be at least 5 characters long')
//         .trim()
//         .escape(),
//
//     body('city')
//         .notEmpty().withMessage('City is required')
//         .isLength({ min: 2 }).withMessage('City must be at least 2 characters long')
//         .trim()
//         .escape(),
//
//     body('mobileNumber')
//         .notEmpty().withMessage('Mobile number is required')
//         .isMobilePhone('en-US').withMessage('Invalid mobile number format')
//         .trim()
//         .escape(),
//
//     body('state')
//         .notEmpty().withMessage('State is required')
//         .isLength({ min: 2 }).withMessage('State must be at least 2 characters long')
//         .trim()
//         .escape(),
//
//     body('zipcode')
//         .notEmpty().withMessage('Zipcode is required')
//         .isPostalCode('any').withMessage('Invalid zipcode format')
//         .trim()
//         .escape(),
//
//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];