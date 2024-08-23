import { Op, Sequelize } from 'sequelize';
import { db } from '../database'; // Assume models are defined
import { CustomError } from '../middleware/customError';
import sequelize from '../database/connection';

export async function getMostBoughtProducts(startDate: Date, endDate: Date, minOrderCount: number) {
    //this function will return all the product that get ordered between two date (startDate,endDate)
    //also Ordercount for those product is more than minOrderCount that the admin will inter it
    try {
        const products = await db.Orders.findAll({
            attributes: ['productId', [sequelize.fn('count', sequelize.col('productId')), 'orderCount']],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: db.Products,
                    attributes: ['label', 'price']
                }
            ],
            group: ['Orders.productId', 'Product.id', 'Product.label', 'Product.price'],
            having: Sequelize.where(Sequelize.fn('COUNT', Sequelize.col('Orders.productId')), '>', minOrderCount),
            order: [['orderCount', 'DESC']]
        });
        if (products.length > 0) {
            return products;
        } else {
            throw new CustomError('Could not find Any products', 404);
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}

export async function getProductsNotBought(daysToConsiderNew: number) {
    //return all the product that didn't sell or get ordered for the last days that the admin inter
    try {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - daysToConsiderNew);

        const products = await db.Products.findAll({
            attributes: ['id', 'label', 'title'],
            where: {
                unitsSold: {
                    [Op.lt]: 1
                },

                createdAt: {
                    [Op.lt]: dateThreshold
                }
            }
        });
        if (products.length > 0) {
            return products;
        } else {
            throw new CustomError('Could not find Any products', 404);
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}

export async function getItemsToDrop(units: number, daysToConsiderNew: number) {
    try {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - daysToConsiderNew);

        const productsToDrop = await db.Products.findAll({
            attributes: ['id', 'title', 'label'],
            where: {
                id: {
                    [Op.notIn]: Sequelize.literal(`
                    (SELECT DISTINCT "productId" FROM "Orders" WHERE "createdAt" > NOW() - INTERVAL '1 YEAR')
                `)
                },
                unitsSold: {
                    [Op.lt]: units
                },
                createdAt: {
                    [Op.lt]: dateThreshold
                }
            }
        });

        if (productsToDrop.length > 0) {
            return productsToDrop;
        } else {
            throw new CustomError('Could not find Any products to Drop', 404);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}

export async function getProductsByRegion(country: string) {
    try {
        const products = await db.Orders.findAll({
            attributes: ['productId', [sequelize.fn('count', sequelize.col('productId')), 'orderCount']],
            include: [
                {
                    model: db.Products,
                    attributes: ['id', 'label', 'price']
                },
                {
                    model: db.Address,
                    attributes: [],
                    where: {
                        state: country
                    }
                }
            ],

            group: ['productId', 'Product.id', 'Product.label', 'Product.price'],
            order: [['orderCount', 'DESC']]
        });

        if (products.length > 0) {
            return products;
        } else {
            throw new CustomError('Could not find Any products', 404);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}
