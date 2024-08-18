import { Request, Response, NextFunction } from 'express';
import sequelize from '../database/connection';
import Users from '../database/models/users';
import Address from '../database/models/address';
import Cart from '../database/models/cart';
import Products from '../database/models/products';
import Orders from '../database/models/orders';
import Transactions from '../database/models/Transactions';
import CartItems from '../database/models/cartItems';
import { NewAddress, newOrder } from '../utils/interfaces';
import { creditCardInformation } from './paymentController';
import cart from '../database/models/cart';
// import { Card, NewAddress, CheckoutData, CartUser } from '../utils/interfaces';


export const GetShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Products,
                    as: 'Product',
                    attributes: ['id', 'label', 'description', 'price', 'imageUrl', 'unitsSold']
                }

            ]
        });
        res.status(200).json(cartItems);
        return cartItems;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    const { fullName, mobile, street, city, state, zipcode } = req.body as NewAddress;

    try {
        const transaction = await sequelize.transaction();

        try {
            // Check if user exists
            const user = await Users.findByPk(userId, { transaction });
            res.json(user);
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ message: 'User not found!' });
            }

            // Check if the user already has an address
            const existingAddress = await Address.findOne({
                where: { userId },
                transaction
            });

            let address;
            if (req.body) {
                address = await Address.create({
                    fullName,
                    mobile,
                    street,
                    city,
                    state,
                    zipcode,
                    userId
                }, { transaction });
                console.log('New address:', address.toJSON());
                res.status(201).json({ message: 'Address created successfully', address });
                return address.id;
            }

            // If no address data is provided, return the existing address
            address = existingAddress;
            await transaction.commit();
             return res.status(200).json({ message: 'Address retrieved successfully', address });
        } catch (error) {
            await transaction.rollback();
            console.error('Error creating address:', error);
            return res.status(500).json({ message: 'Error creating address' });
        }
    } catch (error) {
        console.error('Error starting transaction:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    return creditCardInformation(req, res, next);
};

export const createTransaction = async (userId: number, totalPrice: number, shippingAddress: string, paymentStatus: string = 'pending', shippingStatus: string = 'pending') => {
    try {
        const newTransaction: Transactions = await Transactions.create({
            userId,
            totalPrice,
            shippingAddress,
            paymentStatus,
            shippingStatus
        });
        return newTransaction;
    } catch (err) {
        console.error('Error creating transaction:', err);
        throw err;
    }
};
export const createOrder = async (userId: number, productId: number, transactionId: number, addressId: number) => {
    try {
        const newOrder = await Orders.create({
            userId,
            productId,
            transactionId,
            addressId
        });
        return newOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Re-throw error for handling at higher level
    }
};


// export const updateUnitsSold = async (productId: number, unitsSold: number) => {
//     try {
//         const product = await Products.findByPk(productId);
//         if (product) {
//             product.unitsSolid += unitsSold;
//             await product.save();
//         }
//     } catch (error) {
//         console.error('Error updating number of products sold:', error);
//     }
// };
export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, cartId } = req.body;
    try {
        const cart = await Cart.findOne({ where: { userId, id: cartId } });
        if (cart) {
            await cart.destroy();
            res.status(200).json({ message: 'Cart deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// export const decreaseProductQuantity = async (cart) => {
//     try {
//         cart.map(async product => {
//             await Products.findByPk(cart.productId);
//             if (product) {
//                 product.quantity -= product.unitsSold;
//                 await product.save();
//             }
//         });
//
//     } catch (error) {
//         console.error('Error updating number of products sold:', error);
//     }
//
// };


// export const completeCheckout = async (req: Request, res: Response, next: NextFunction) => {
//     const userId = parseInt(req.params.userId);
//
//     try {
//
//         const cartItems = await Cart.findAll({ where: { userId } });
//
//
//         const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//
//
//         const addressId = await createAddress(req, res, next);
//
//         // Create transaction
//         const transaction = await createTransaction(userId, totalPrice, shippingAddress);
//
//         // Process payment information
//         await createPayment(req, res, next);
//
//         // decrease product quantity
//         await decreaseProductQuantity(cart);
//
//         // saves the number of units sold per item
//         await updateUnitsSold(productId, unitsSold);
//
//         // Create orders
//         const orders = cartItems.map(async item => {
//             return await createOrder(userId, item.productId, transaction.id, addressId);
//         });
//         await Promise.all(orders);
//
//         // Delete cart
//         await deleteCart({ userId });
//
//         res.status(200).json({ message: 'Checkout successful' });
//     } catch (error) {
//         console.error('Checkout error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };