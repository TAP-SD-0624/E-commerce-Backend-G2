import { NextFunction, Request, response, Response } from 'express';
import { getItemsToDrop, getMostBoughtProducts, getProductsByRegion, getProductsNotBought } from '../utils/adminUtils';

export const mostBoughtProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { startDate, endDate, minOrderCount } = req.body;
        const x = await getMostBoughtProducts(startDate, endDate, minOrderCount);
        res.send(x);
    } catch (error) {
        next(error);
    }
};

export const ProductsNotBought = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { daysToConsiderNew } = req.body;
        const x = await getProductsNotBought(daysToConsiderNew);
        res.send(x);
    } catch (error) {
        next(error);
    }
};

export const itemsToDrop = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { units, daysToConsiderNew } = req.body;
        const x = await getItemsToDrop(units, daysToConsiderNew);
        res.send(x);
    } catch (error) {
        next(error);
    }
};

export const ProductsByRegion = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { state } = req.body;
        const x = await getProductsByRegion(state);
        res.send(x);
    } catch (error) {
        next(error);
    }
};
