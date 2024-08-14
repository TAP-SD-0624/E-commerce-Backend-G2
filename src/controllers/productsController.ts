import { NextFunction, Request, Response } from 'express';
import {
    getCardOneProducts,
    getCardThreeProducts,
    getCardTwoProducts,
    getHandPickedCollections,
    getProductPageById,
    getProductsByBrandId,
    getProductsByCategoryId,
    searchForProductsOrBrands
} from '../utils/ProductsUtils';

export const getItemPageById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const result = await getProductPageById(id);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export const getItemByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const result = await getProductsByCategoryId(id);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export const searchInItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const searchValue: string = req.query.searchValue as string;
        const x = await searchForProductsOrBrands(searchValue);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const itemsCardOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await getCardOneProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const itemsCardTwo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await getCardTwoProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

export const itemsCardThree = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await getCardThreeProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

export const getItemByBrandId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await getProductsByBrandId(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const getHandPickedCollectionItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await getHandPickedCollections(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
