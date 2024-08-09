import { Router } from 'express';
import { createUser, userLogin, userLogout, prohibitedRoute } from '../controllers/userController';
import { createUserValidation } from '../middleware/validationMiddleware';

const userRouter: Router = Router();

// user routes
userRouter.post('/users', createUserValidation, createUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);

export default userRouter;
