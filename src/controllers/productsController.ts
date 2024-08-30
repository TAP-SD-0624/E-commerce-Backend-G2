import { NextFunction, Request, Response } from 'express';
import * as DBU from '../utils/ProductsUtils';
import { uploadImages } from '../utils/firebase';
import { CustomError } from '../middleware/customError';
/**
 * @swagger
 * /products/itemPage:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A single product retrieved successfully
 *       404:
 *         description: Product not found
 */

export const getItemPageById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const result = await DBU.getProductPageById(id);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/itemByCategory:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve Products by Category ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the Category to retrieve products
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const getItemByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const result = await DBU.getProductsByCategoryId(id);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/productSearch:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search for product or brand
 *     parameters:
 *       - in: query
 *         name: searchValue
 *         required: true
 *         description: The name of the product or the brand
 *         schema:
 *           type: string
 *           example: "Dior"
 *     responses:
 *       200:
 *         description: A single product retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const searchInItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const searchValue: string = req.query.searchValue as string;
        const x = await DBU.searchBar(searchValue);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/itemCardOne:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all the products that are less than 20 in stock.
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const itemsCardOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardOneProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/itemCardTwo:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all the products that have a discount of 15% or more.
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const itemsCardTwo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardTwoProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/itemCardThree:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all the products that have a rating of 4.5 or more.
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const itemsCardThree = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getCardThreeProducts();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/newArrivals:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all the products that arrive the last three months
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const getNewArrivalsItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const x = await DBU.getNewArrivals();
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/itemByBrand:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve Products by Brand ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the Brand to retrieve products
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const getItemByBrandId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await DBU.getProductsByBrandId(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};
/**
 * @swagger
 * /products/handPickedCollection:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve Products that is rated 4.5 or more and the price is less than 100
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the Category to retrieve products
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: All the products retrieved Successfully
 *       404:
 *         description: no result were found
 */
export const getHandPickedCollectionItems = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const id: number = Number(req.query.id);
        const x = await DBU.getHandPickedCollections(id);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /products/addItemToCart:
 *   post:
 *     summary: add Item to cart
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productID'
 *     responses:
 *       200:
 *         description: item added succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const addItemToCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.addToCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /products/reduceItemFromCart:
 *   delete:
 *     summary: reduce Item number from cart
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productID'
 *     responses:
 *       200:
 *         description: item nimber reduced succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const reduceItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.reduceFromCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /products/removeItemFromCart:
 *   delete:
 *     summary: remove Item from cart
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productID'
 *     responses:
 *       200:
 *         description: item removed succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const removeItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.deleteFromCart(productId, req.body.decoded.userId);
        return res.send(x);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /products/toggleItemInWishList:
 *   post:
 *     summary: toggle Item in wishlist
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productID'
 *     responses:
 *       200:
 *         description: item toggled succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const toggleItemInWishList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { productId } = req.body;
        const x = await DBU.toggleWishList(productId, req.body.decoded.userId);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /products/upsertUserReview:
 *   post:
 *     summary: upsert user review
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userReview'
 *     responses:
 *       200:
 *         description: product reviewed succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
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
