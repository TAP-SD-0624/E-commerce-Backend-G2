import {Router} from 'express';
import {createUser, userLogin, prohibitedRoute} from '../controllers/userController';
import {validateLogin, validateUser} from '../middleware/validateUser';

const userRouter: Router = Router();

// user routes
userRouter.post('/register', validateUser, createUser);
userRouter.post('/login', userLogin);


// get wishlist
// get getUserById
// get shopping cart for user by userId
// see all reviews by userId
// see all addresses by userId
// see all payment cards
// Update user


export default userRouter;