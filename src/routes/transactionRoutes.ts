import Router from 'express';
import {transaction } from '../controllers/paymentController';

const transactionRouter = Router();



transactionRouter.post('/', transaction);

export default transactionRouter;