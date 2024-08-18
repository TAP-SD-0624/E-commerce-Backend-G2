import { Request, Response, NextFunction } from 'express';
import Products from "../database/models/products";
import {Op} from "sequelize";

// export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
//     const {
//         brandId,
//         label,
//         description,
//         price,
//         discount,
//         title,
//         quantity,
//         imageUrl
//     } = req.body;
//     console.log("clicked");
//     try {
//         const product = await Products.create({
//             brandId,
//             label,
//             description,
//             price,
//             discount,
//             title,
//             quantity,
//             imageUrl
//         });
//     console.log(product);
//         res.status(201).json({ product });
//     } catch (error) {
//         next(error);
//     }
// };

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: `Product ${product.title} deleted successfully` });
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
}

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { brandId, label, description, price, discount, title, quantity, imageUrl } = req.body;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.update({
            brandId,
            label,
            description,
            price,
            discount,
            title,
            quantity,
            imageUrl
        });
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
}

export const getProductByName = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;

    try {
        const product = await Products.findOne({
            where: {
                title: {
                    [Op.iLike]: name
                }
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};