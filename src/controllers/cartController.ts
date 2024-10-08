import { NextFunction, Request, Response } from 'express';
import { addNewAddress, addNewTranactions, finishCheckout, GetAddressById, getAllFromTheCart } from '../utils/cartUtils';

export const getUserAddresses = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await GetAddressById(req.body.decoded.userId);

        return res.send(x);
    } catch (error) {
        next(error);
    }
};

export const createNewAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { state, city, street, zipcode, fullName, mobile } = req.body;
        const x = await addNewAddress(req.body.decoded.userId, state, city, street, zipcode, mobile, fullName);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

export const createTranactions = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { paymentStatus, shipingStatus, totalPrice, shipingAddress } = req.body;
        await addNewTranactions({ userId: req.body.decoded.userId, paymentStatus, shipingStatus, totalPrice, shipingAddress });
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
export const getShoppingCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await getAllFromTheCart(req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: upsert user review
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/checkoutInterface'
 *     responses:
 *       200:
 *         description: order dine succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const checkout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { state, city, street, zipcode, fullName, mobile, paymentStatus, totalPrice } = req.body;
        const result = await finishCheckout(req.body.decoded.userId, state, city, street, zipcode, fullName, mobile, paymentStatus, totalPrice);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
