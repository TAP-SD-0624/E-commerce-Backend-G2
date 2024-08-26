"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaildateRegion = exports.itemsToDrop = exports.VaildateNotBought = exports.VaildateMostBought = exports.validateCheckout = void 0;
var express_validator_1 = require("express-validator");
// validation rules for checkout
exports.validateCheckout = [
    (0, express_validator_1.body)('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('street')
        .notEmpty()
        .withMessage('Street address is required')
        .isLength({ min: 5 })
        .withMessage('Street address must be at least 5 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('city')
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2 })
        .withMessage('City must be at least 2 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('mobile')
        .notEmpty()
        .withMessage('Mobile number is required')
        .isLength({ min: 10 })
        .withMessage('mobile must be at least 10 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('state')
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 2 })
        .withMessage('State must be at least 2 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('zipcode').notEmpty().withMessage('Zipcode is required').isPostalCode('any').withMessage('Invalid zipcode format').trim().escape(),
    (0, express_validator_1.body)('paymentStatus')
        .notEmpty()
        .withMessage('paymentStatus is required')
        .isLength({ min: 4 })
        .withMessage('paymentStatus must be at least 4 characters long')
        .trim()
        .escape(),
    (0, express_validator_1.body)('totalPrice')
        .notEmpty()
        .withMessage('totalPrice is required')
        .isFloat({ min: 0 })
        .withMessage('totalPrice must be more than 0')
        .trim()
        .escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        }
        else {
            next();
        }
    }
];
exports.VaildateMostBought = [
    (0, express_validator_1.body)('startDate').notEmpty().withMessage('startDate is required').isDate().withMessage('Invalid date format').toDate().trim().escape(),
    (0, express_validator_1.body)('endDate').notEmpty().withMessage('endDate is required').isDate().withMessage('Invalid date format').toDate().trim().escape(),
    (0, express_validator_1.body)('minOrderCount')
        .notEmpty()
        .withMessage('minOrderCount is required')
        .isInt({ min: 0 })
        .withMessage('minOrderCount must be more than -1')
        .trim()
        .escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        }
        else {
            next();
        }
    }
];
exports.VaildateNotBought = [
    (0, express_validator_1.body)('daysToConsiderNew')
        .notEmpty()
        .withMessage('daysToConsiderNew is required')
        .isInt({ min: 0 })
        .withMessage('daysToConsiderNew must be more than -1')
        .trim()
        .escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        }
        else {
            next();
        }
    }
];
exports.itemsToDrop = [
    (0, express_validator_1.body)('daysToConsiderNew')
        .notEmpty()
        .withMessage('daysToConsiderNew is required')
        .isInt({ min: 0 })
        .withMessage('daysToConsiderNew must be more than -1')
        .trim()
        .escape(),
    (0, express_validator_1.body)('units').notEmpty().withMessage('units is required').isInt({ min: 0 }).withMessage('units must be more than -1').trim().escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        }
        else {
            next();
        }
    }
];
exports.VaildateRegion = [
    (0, express_validator_1.body)('state')
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 2 })
        .withMessage('State must be at least 2 characters long')
        .trim()
        .escape(),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.mapped());
        }
        else {
            next();
        }
    }
];
