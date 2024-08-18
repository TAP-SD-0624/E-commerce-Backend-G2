import Router from 'express';


import {

    createAddress,
    createOrder,
    createPayment,
    createTransaction,
    GetShoppingCart
} from '../controllers/cashOut';

const transactionRouter = Router();

transactionRouter.get('/:userId', GetShoppingCart);
transactionRouter.post('/address/:userId', createAddress);
transactionRouter.post('/payment/:userId', createPayment); // Assuming this handles payment logic
//transactionRouter.post('/checkout/:userId', completeCheckout);


export default transactionRouter;