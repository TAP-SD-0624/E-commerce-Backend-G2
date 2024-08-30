import { NextFunction, Request, Response } from 'express';
import { getAllBrands, getAllCategories, getNewArrivals, getNewArrivalsHome } from '../utils/ProductsUtils';

/**
 * @swagger
 * /homePage:
 *   get:
 *     summary: Home page content
 *     tags: [homePage]
 *     responses:
 *       200:
 *         description: home page retrieved succesfully
 *       500:
 *         description: something went wrong
 */
export const homePageController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await getAllCategories();
        const brands = await getAllBrands();
        const newArrivals = await getNewArrivalsHome();
        return res.send({ categories, brands, newArrivals });
    } catch (error) {
        next(error);
    }
};
