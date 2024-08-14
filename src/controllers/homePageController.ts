import { Request, Response } from 'express';
import { getAllBrands, getAllCategories, getNewArrivals } from '../utils/ProductsUtils';
export const homePageController = async (req: Request, res: Response) => {
    const categories = await getAllCategories();
    const brands = await getAllBrands();
    const newArrivals = await getNewArrivals();
    return res.send({ categories, brands, newArrivals });
};
