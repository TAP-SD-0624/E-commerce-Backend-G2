import { NextFunction, Request, Response } from 'express';
import { getAllBrands, getAllCategories, getNewArrivals, getNewArrivalsHome } from '../utils/ProductsUtils';
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
