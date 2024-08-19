import { Request, Response, NextFunction } from 'express';
import sequelize from '../database/connection';
import Users from '../database/models/users';
import Address from '../database/models/address';
import Cart from '../database/models/cart';
import Products from '../database/models/products';
import Orders from '../database/models/orders';
import Transactions from '../database/models/Transactions';
import CartItems from '../database/models/cartItems';
import { Card, NewAddress, newOrder } from '../utils/interfaces';
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
    const { fullName, mobile, street, city, state, zipcode, userId } = req.body as NewAddress;

    const user = await Address.findAll({
        where: { userId }
    });
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }

    if (req.body) {
        const newAddress = await Address.create({ fullName, mobile, street, city, state, zipcode, userId });
        res.json(newAddress.id);

    } else {
        const address = await Address.findOne({ where: { userId } });
        if(!address){

            res.status(404).json({ error: 'Address not found' });
        }
        else{ res.json(address.id)
        }
    }
};


export const getCreditCardInformation = (req: Request, res: Response, next: NextFunction): Promise<number> => {
    const { cardHolder, cardNumber, expiration, ccv, amount } = req.body as Card;

    if (!cardHolder || !cardNumber || !expiration || !ccv || !amount) {
        return Promise.reject(new Error('Please enter all required fields'));
    }

    return Promise.resolve(amount);
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    let balance: number = 5000;

    try {
        const amount = await getCreditCardInformation(req, res, next);
        if (balance < amount)
            return res.status(400).json({ message: 'Insufficient balance' });
        balance -= amount;
        return res.status(200).json({ message: 'Payment processed', balance });
    } catch (error) {
        return res.status(400).json({ message: 'error creating payment, please check your credit card information' });
    }
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

// export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, cartId } = req.body;
//     try {
//         const cart = await Cart.findOne({ where: { userId, id: cartId } });
//         if (cart) {
//             await cart.destroy();
//             res.status(200).json({ message: 'Cart deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Cart not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting cart:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

export const updateUnitsSold = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { quantity } = req.body;
    if (!userId) {
        res.json({ message: 'User id is required' });
    }
    const cart = await Cart.findAll({ where: { userId } });

    try {
        for (const product of cart) {
            console.log(product.productId);
            const productData = await Products.findOne({ where: { id: product.productId } });
            if (productData) {
                const newUnitsSold = productData.unitsSold + quantity;
                await productData.update(
                    { unitsSold: newUnitsSold },
                    { where: { id: product.productId } }
                );
                res.json({ message: 'Product number of units sold updated successfully', newUnitsSold });
            } else {
                console.log('product not found');
            }
        }
        // Add a success response here if needed
    } catch (error) {
        console.error('Error updating number of units sold:', error);
        // Add an error response here
    }
};


export const decreaseProductQuantity = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { quantity } = req.body;
    if (!userId) {
        res.status(400).json({ message: 'User id is required' });
    }
    const cart = await Cart.findAll({ where: { userId } });

    try {
        for (const product of cart) {
            const productData = await Products.findOne({ where: { id: product.productId } });
            if (productData) {
                const newQuantity = productData.quantity - quantity;
                await productData.update(
                    { quantity: newQuantity },
                    { where: { id: product.productId } }
                );
                res.json({ message: 'Product stock quantity updated successfully' });
            } else {
                console.log('product not found');
            }
        }
        // Add a success response here if needed
    } catch (error) {
        console.error('Error updating number of products sold:', error);
        // Add an error response here
    }
};
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