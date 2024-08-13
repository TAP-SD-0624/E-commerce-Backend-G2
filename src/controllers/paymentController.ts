import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user'; // Assuming User model is defined in a separate file
import { Address } from '../models/address'; // Assuming Address model is defined in a separate file

interface Card {
    cardNumber: string;
    cardHolder: string;
    expiration: string;
    cvv: string;
    amount: number;
}

export const creditCardPayment = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
    const { cardNumber, cardHolder, expiration, cvv, amount } = req.body as Card;
    const balance: number = 5000;

    if (!cardNumber || !cardHolder || !expiration || !cvv || !amount) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }
    if (balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
    }
    const newBalance: number = balance - amount;
    return res.status(200).json({ message: 'Payment successful', newBalance });
};

export const transaction = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
    return creditCardPayment(req, res, next);
};

export const getCartItem = async (req: Request, res: Response, next: NextFunction) => {

};

export const getAllCartItems = async (req: Request, res: Response, next: NextFunction) => {

};

interface NewAddress {
    fullName: string
    mobile: string,
    street: string,
    city: string,
    state: string,
    zipcode: number
}

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
    let address: Address;
    if (user) {
        address = user.address.id;
    }

    if (user.addressId === null) {
        const { fullName, mobile, street, city, state, zipcode } = req.body as NewAddress;
        address = await Address.create({ fullName, mobile, street, city, state, zipcode });
        user.addressId = address.id;
        await user.save();
    }
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {

};

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {

};
export const updateProductQuantity = async (req: Request, res: Response, next: NextFunction) => {

};
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {

};
export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {

};

interface CheckoutDate {

    userId: number;
    cartId: number;
    newAddressData?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    paymentData: {
        cardNumber: string;
        cardHolder: string;
        expiration: string;
        cvv: string;
        amount: number;
    };
}

async function checkout(userId: number, cartId: number, newAddressData: Promise<any>, paymentData: Promise<any>) {
    try {
        // Get cart item details
        const cartItems = await getAllCartItems(cartId);

        // Calculate total amount
        const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        // Create new address if provided
        let addressId;
        if (newAddressData) {
            const address = await createAddress(newAddressData);
            addressId = address.id;
        }

        // Create payment
        const payment = await createPayment(paymentData);

        // Create transaction
        const transaction = await createTransaction(userId, totalAmount, addressId);

        // Update product quantities
        await Promise.all(cartItems.map(async (item) => {
            await updateProductQuantity(item.product.id, item.quantity);
        }));

        // Create order
        const orderItems = cartItems.map((item) => ({
            productId: item.product.id,
            userId,
            transactionId: transaction.id,
            addressId
        }));
        await createOrder(orderItems);

        // Delete cart
        await deleteCart(cartId);

        return { success: true, transactionId: transaction.id };
    } catch (error: Error) {
        console.error('Checkout error:', error);
        return { success: false, error: error.message };
    }
}

export default checkout;
