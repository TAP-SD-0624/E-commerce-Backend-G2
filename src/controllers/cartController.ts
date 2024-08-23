import { NextFunction, Request, Response } from 'express';
import { addNewAddress, addNewTranactions, finishCheckout, GetAddressById, getAllFromTheCart } from '../utils/cartUtils';
import { promises } from 'dns';
import transaction from 'sequelize/types/transaction';

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
export const checkout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { state, city, street, zipcode, fullName, mobile, paymentStatus, totalPrice } = req.body;
        await finishCheckout(req.body.decoded.userId, state, city, street, zipcode, fullName, mobile, paymentStatus, totalPrice);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
