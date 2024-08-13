import { Router } from 'express';
import { createUser, userLogin, userLogout, prohibitedRoute, userUpdate } from '../controllers/userController';
import { validateLogin, validateUser } from '../middleware/validateUser';
import { verifyToken } from '../middleware/authorizeMiddleware';
import authenticateToken from '../utils/tokenUtils';

const userRouter: Router = Router();

// user routes
userRouter.post('/register', validateUser, createUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.post('/update', authenticateToken, validateUser, userUpdate);

// get wishlist
// get getUserById
// get shopping cart for user by userId
// see all reviews by userId
// see all addresses by userId
// see all payment cards
// Update user

export default userRouter;
