import { NextFunction, Request, Response } from 'express';
import * as DBU from '../utils/ProductsUtils';
import { uploadImages } from '../utils/firebase';
import { CustomError } from '../middleware/customError';
import { databaseResponseTimeHistogram } from '../utils/prom.utils';

export const getItemPageById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const metricData = {
        operation: 'getProductPageById'
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const id: number = Number(req.query.id);
        const result = await DBU.getProductPageById(id);
        timer({ ...metricData, success: 'true' });
        return res.send(result);
    } catch (error) {
        timer({ ...metricData, success: 'false' });
        next(error);
    }
};

export const getItemByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const result = await DBU.getProductsByCategoryId(id);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export const searchInItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const searchValue: string = req.query.searchValue as string;
        const x = await DBU.searchBar(searchValue);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const itemsCardOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardOneProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const itemsCardTwo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardTwoProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

export const itemsCardThree = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardThreeProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const getNewArrivalsItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getNewArrivals();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const getItemByBrandId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await DBU.getProductsByBrandId(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const getHandPickedCollectionItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await DBU.getHandPickedCollections(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const addItemToCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.addToCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const reduceItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.reduceFromCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const removeItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.deleteFromCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
export const toggleItemInWishList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.toggleWishList(productId, req.body.decoded.userId);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
export const upsertUserReviewOrRating = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId, newReview, newRating } = req.body;
        await DBU.updateUserReviewTransaction(productId, req.body.decoded.userId, newReview, newRating);
        return res.sendStatus(202);
    } catch (error) {
        next(error);
    }
};
export const createNewProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { brandId, label, description, price, title, imageUrl, quantity, categoriesIdsList, imagesUrlList, tags, discount } = req.body;
        await DBU.createNewProductTransaction(
            brandId,
            label,
            description,
            price,
            title,
            imageUrl,
            quantity,
            categoriesIdsList,
            imagesUrlList,
            tags,
            discount
        );
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        await DBU.deleteProductById(req.body.productId);
        return res.sendStatus(202);
    } catch (error) {
        next(error);
    }
};
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId, brandId, label, description, price, title, imageUrl, quantity, tags, discount } = req.body;
        await DBU.updateProductById(productId, brandId, label, description, price, discount, title, imageUrl, quantity, tags);
        return res.sendStatus(202);
    } catch (error) {
        next(error);
    }
};
export const uploadProductImages = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const files = req.files as Array<any>;
        if (files.length < 1) throw new CustomError('no images were provided', 422);
        const arr = await uploadImages(files);
        res.send(arr);
    } catch (error) {
        next(error);
    }
};
