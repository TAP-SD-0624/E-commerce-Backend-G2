import { Router } from 'express';
import { createUser, userLogin, userLogout, prohibitedRoute, userUpdate, userProfile } from '../controllers/userController';
import { validateLogin, validateUpdateUser, validateUser } from '../middleware/validateUser';
import { errorMiddleware } from '../middleware/customError';
// import { verifyToken } from '../middleware/authorizeMiddleware';
import authenticateToken from '../utils/tokenUtils';

const userRouter: Router = Router();

// user routes
userRouter.post('/register', validateUser, createUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.post('/update', authenticateToken, validateUpdateUser, userUpdate);
userRouter.get('/profile', authenticateToken, userProfile);

// get wishlist
// get getUserById
// get shopping cart for user by userId
// see all reviews by userId
// see all addresses by userId
// see all payment cards
// Update user

export default userRouter;
