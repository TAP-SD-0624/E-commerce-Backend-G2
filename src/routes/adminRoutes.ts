import { Router } from 'express';
import * as ad from '../controllers/adminController';
import authenticateToken from '../utils/tokenUtils';
import { itemsToDrop, VaildateMostBought, VaildateNotBought, VaildateRegion } from '../middleware/validateCheckout';

const AdminRouter: Router = Router();

AdminRouter.get('/mostBoughtProducts', [authenticateToken('admin'), ...VaildateMostBought], ad.mostBoughtProducts);
AdminRouter.get('/ProductsNotBought', [authenticateToken('admin'), ...VaildateNotBought], ad.ProductsNotBought);
AdminRouter.get('/itemsToDrop', [authenticateToken('admin'), ...itemsToDrop], ad.itemsToDrop);
AdminRouter.get('/ProductsByRegion', [authenticateToken('admin'), ...VaildateRegion], ad.ProductsByRegion);

export default AdminRouter;
