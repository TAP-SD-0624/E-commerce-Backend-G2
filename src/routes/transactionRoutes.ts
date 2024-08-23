import Router from 'express';


import {
    createAddress,
    createOrder,
    createPayment,
    createTransaction, decreaseProductQuantity,
    GetShoppingCart, updateUnitsSold
} from '../controllers/cashOutController';

const transactionRouter = Router();

transactionRouter.get('/:userId', GetShoppingCart);
transactionRouter.post('/address/:userId', createAddress);
transactionRouter.post('/payment/:userId', createPayment);
transactionRouter.post('/updateQuantity/:userId', decreaseProductQuantity);
transactionRouter.post('/updateUnitsSold/:userId', updateUnitsSold);
//transactionRouter.post('/checkout/:userId', completeCheckout);


export default transactionRouter;