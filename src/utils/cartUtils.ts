import { Op, where, Sequelize } from 'sequelize';
import { CustomError } from '../middleware/customError';
import { db } from '../database';
import sequelize from '../database/connection';

export async function GetAddressById(userId: number) {
    try {
        const Addresses = await db.Address.findAll({
            attributes: ['id', 'state', 'city', 'mobile', 'street', 'zipcode', 'fullName'],
            where: { userId }
        });
        if (!Addresses) {
            throw new CustomError('Couldnt find Any Address', 404);
        } else {
            return Addresses;
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}

export async function addNewAddress(
    userId: number,
    state: string,
    city: string,
    street: string,
    zipcode: number,
    mobile: string,
    fullName: string,
    transaction?: any
) {
    try {
        let ad = await db.Address.findOne({
            where: {
                [Op.and]: [
                    { userId: userId },
                    { state: state },
                    { street: street },
                    { city: city },
                    { zipcode: zipcode },
                    { fullName: fullName },
                    { mobile: mobile }
                ]
            },
            transaction
        });

        if (ad) {
            return ad;
        } else {
            ad = await db.Address.create({ userId, state, street, city, zipcode, fullName, mobile }, { transaction });
            if (ad) {
                return ad;
            } else {
                throw new CustomError('can not create this address', 404);
            }
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);

        throw new CustomError('Oops, something went wrong', 500);
    }
}

export async function addNewTranactions({
    userId,
    paymentStatus,
    shipingStatus,
    totalPrice,
    shipingAddress,
    transaction
}: {
    userId: number;
    paymentStatus: string;
    shipingStatus?: string;
    totalPrice: number;
    shipingAddress: string;
    transaction?: any;
}) {
    try {
        let tr = await db.Tranactions.create(
            {
                userId,
                paymentStatus: paymentStatus || 'pending',
                shipingStatus: shipingStatus || 'pending',
                totalPrice,
                shipingAddress
            },
            { transaction }
        );
        return tr;
    } catch (error) {
        throw new CustomError('Oops, something went wrong', 500);
    }
}
export async function getAllFromTheCart(userId: number, transaction?: any) {
    try {
        const cartItems = await db.Cart.findAll({
            attributes: ['productId'],
            where: { userId },
            include: [
                {
                    model: db.Products,
                    as: 'Product',
                    attributes: ['id', 'label', 'title', 'price', 'imageUrl']
                }
            ],
            transaction
        });
        if (cartItems.length > 0) {
            return cartItems;
        } else {
            throw new CustomError('There is no item in the cart', 404);
        }
    } catch (error) {
        if (error instanceof CustomError) {
            throw new CustomError(error.message, error.statusCode);
        }
        throw new CustomError('Oops, something went wrong', 500);
    }
}
export async function finishCheckout(
    userId: number,
    state: string,
    city: string,
    street: string,
    zipcode: number,
    mobile: string,
    fullName: string,
    paymentStatus: string,
    totalPrice: number
) {
    const transaction = await sequelize.transaction();
    try {
        const Address = await addNewAddress(userId, state, city, street, zipcode, mobile, fullName, transaction);
        const transactionRecord = await addNewTranactions({
            userId,
            paymentStatus,
            totalPrice,
            transaction,
            shipingAddress: Address.state
        });
        const cartItems = await getAllFromTheCart(userId, transaction);
        if (cartItems.length === 0) {
            throw new CustomError('Cart is empty', 404);
        }
        if (transactionRecord.id && Address.id) {
            for (const item of cartItems) {
                const product = await db.Products.findOne({ where: { id: item.productId }, transaction });
                if (!product || product.quantity < 1) {
                    throw new CustomError(`${product?.title} is out of stock or You ordered more than what is in stock.`, 400);
                }
                await db.Products.increment({ unitsSold: 1, quantity: -1 }, { where: { id: item.productId }, transaction });
                await db.Orders.create(
                    {
                        userId,
                        productId: item.productId,
                        transactionId: transactionRecord.id,
                        addressId: Address.id
                    },
                    { transaction }
                );
            }
            await db.Cart.destroy({ where: { userId }, transaction });
        } else {
            throw new CustomError('there is no transactionId or addressId', 404);
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        if (error instanceof CustomError) {
            throw new CustomError(error.message, error.statusCode);
        }
        throw new CustomError('Oops, something went wrong', 500);
    }
}
