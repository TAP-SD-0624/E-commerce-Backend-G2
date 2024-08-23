import { Router } from 'express';
import * as cr from '../controllers/cartController';
import authenticateToken from '../utils/tokenUtils';
import { validateAddress, validateCheckout, validateTransaction } from '../middleware/validateCheckout';

const cartRouter: Router = Router();

cartRouter.post('/newAddress', [authenticateToken('user'), ...validateAddress], cr.createNewAddress);
cartRouter.get('/allAddresses', authenticateToken('user'), cr.getUserAddresses);
cartRouter.get('/shoppingCart', authenticateToken('user'), cr.getShoppingCart);
cartRouter.post('/addTranaction', [authenticateToken('user'), ...validateTransaction], cr.createTranactions);
cartRouter.post('/checkout', [authenticateToken('user'), ...validateCheckout], cr.checkout);

export default cartRouter;
