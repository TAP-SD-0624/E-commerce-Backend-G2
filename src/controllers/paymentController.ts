import { Request, Response, NextFunction } from 'express';
import { Op, Transaction } from 'sequelize';
import { db } from '../database';
import sequelize from '../database/connection';
import Users from '../database/models/users';
import Address from '../database/models/address';
import Cart from '../database/models/cart';
import Products from '../database/models/products';
import Orders from '../database/models/orders';
import Transactions from '../database/models/Transactions';
import { Card, NewAddress, CheckoutData, CartUser, newOrder } from '../utils/interfaces';


// const user: CartUser = {
//     id: 1,
//     firstName: "Emily",
//     lastName: "Johnson",
//     email: "emily.johnson@x.dummyjson.com",
//     password: "emilyspass",
//     phone: "+81 965-431-3024",
//     imageUrl: "",
//     role: "user",
// };

// Payment using a credit card user can have ccv saved and can confirm ccv
export const creditCardInformation = (req: Request, res: Response, next: NextFunction): Response => {
    const { cardHolder, cardNumber, expiration, ccv, amount } = req.body as Card;
    const balance = 5000;

    if (!cardHolder || !cardNumber || !expiration || !ccv || !amount) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }
    if (balance < amount) {
        return res.status(400).json({ message: 'Transaction could not go through, insufficient balance' });
    }
    const newBalance = balance - amount;
    return res.status(200).json({ message: 'Payment successful', newBalance });
};

// // Create a payment
// export const createPayment = (req: Request, res: Response, next: NextFunction): Response => {
//     return creditCardInformation(req, res, next);
// };

// Fetch all items in the user's cart
// export const getAllCartItems = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.userId;
//
//         const cartItems = await Cart.findAll({
//             where: { userId },
//             include: [
//                 {
//                     model: Products,
//                     as: 'Products'
//                 }
//             ]
//         });
//
//         res.status(200).json(cartItems);
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Create a new address for the user
// export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const transaction = await sequelize.transaction();
//
//         try {
//             const shopperId: number = req.params.userId;
//
//             // Check if user exists
//             const user = await Users.findByPk(shopperId, { transaction });
//
//             if (!user) {
//                 await transaction.rollback();
//                 return res.status(404).json({ message: 'User not found!' });
//             }
//
//             // Check if the user already has an address
//             const existingAddress = await Address.findOne({
//                 where: { userId: shopperId },
//                 transaction
//             });
//
//             if (existingAddress) {
//                 await transaction.rollback();
//                res.status(400).json({ message: 'User already has an address!' });
//             }
//
//             const { fullName, mobile, street, city, state, zipcode } = req.body as NewAddress;
//             const address = await Address.create({
//                 fullName,
//                 mobile,
//                 street,
//                 city,
//                 state,
//                 zipcode,
//                 userId: shopperId
//             }, { transaction });
//             await transaction.commit();
//             res.status(201).json({ message: 'Address created successfully!', address });
//
//         } catch (error) {
//             await transaction.rollback();
//             console.error('Error creating address:', error);
//             res.status(500).json({ message: 'Internal server error!' });
//         }
//     } catch (error) {
//         console.error('Error starting transaction:', error);
//         res.status(500).json({ message: 'Internal server error!' });
//     }
// };



// Update product quantity (Needs implementation)


//update number of products sold for the item
// export const updateNumberOfProductsSold = async (productId: number, quantity: number) => {
//     try {
//         const product = await Products.findByPk(productId);
//         if (product) {
//             product.unitsSold += quantity;
//             await product.save();
//         }
//     } catch (error) {
//         console.error('Error updating number of products sold:', error);
//     }
// };

// Create an order (Needs implementation)


// Delete the user's cart


// Checkout process
export async function checkout(userId: number, newAddressData: NewAddress | undefined, paymentData: Card) {
    // try {
    //     // Get cart items
    //     const cartItems = await getAllCartItems({ params: { userId } } as Request, {} as Response, {} as NextFunction);
    //
    //     // Calculate total amount
    //     const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    //
    //     // Create new address if provided
    //     let addressId;
    //     if (newAddressData) {
    //         const address = await createAddress({ body: newAddressData, params: { userId } } as Request, {} as Response, {} as NextFunction);
    //         addressId = address.id;
    //     }
    //
    //     // Create payment
    //     const payment = await createPayment({ body: paymentData } as Request, {} as Response, {} as NextFunction);
    //
    //     // Create transaction (function needs to be implemented)
    //     const transaction = await createTransaction({ params: { userId, totalAmount, addressId } } as Request, {} as Response, {} as NextFunction);
    //
    //     // Update product quantities (function needs to be implemented)
    //     await Promise.all(cartItems.map(async (item) => {
    //         await updateProductQuantity({ params: { productId: item.product.id, quantity: item.quantity } } as Request, {} as Response, {} as NextFunction);
    //     }));
    //
    //     // Create order (function needs to be implemented)
    //     await createOrder({ body: { orderItems: cartItems } } as Request, {} as Response, {} as NextFunction);
    //
    //     // Delete cart
    //     await deleteCart({ body: { userId, cartId: userId } } as Request, {} as Response, {} as NextFunction);
    //
    //     return { success: true, transactionId: transaction.id };
    // } catch (error) {
    //     console.error('Checkout error:', error);
    //     return { success: false, error: error.message };
    // }
}

export default checkout;

