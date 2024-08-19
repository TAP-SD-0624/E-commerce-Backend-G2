import Router from 'express';


import {

    //createAddress,
    createOrder,
    createPayment,
    createTransaction, decreaseProductQuantity,
    GetShoppingCart
} from '../controllers/cashOut';

const transactionRouter = Router();

transactionRouter.get('/:userId', GetShoppingCart);
//transactionRouter.post('/address/:userId', createAddress);
transactionRouter.post('/payment/:userId', createPayment);
transactionRouter.post('/updateQuantity/:userId', decreaseProductQuantity);
//transactionRouter.post('/checkout/:userId', completeCheckout);


export default transactionRouter;