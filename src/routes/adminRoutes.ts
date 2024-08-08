import { Router } from 'express';
import { prohibitedRoute } from '../controllers/userController';
import { checkRole } from '../middleware/checkRole';
import { verifyToken } from '../middleware/authorizeMiddleware';

const adminRouter: Router = Router();

// Admin routes
adminRouter.use(verifyToken);
adminRouter.use(checkRole(['admin']));
adminRouter.get('/', prohibitedRoute);

export default adminRouter;