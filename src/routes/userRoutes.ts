import { Router } from 'express';
import { createUser, userLogin, userUpdate, userProfile } from '../controllers/userController';
import { validateLogin, validateUpdateUser, validateUser } from '../middleware/validateUser';
import { errorMiddleware } from '../middleware/customError';
// import { verifyToken } from '../middleware/authorizeMiddleware';
import authenticateToken from '../utils/tokenUtils';
import { validateId } from '../middleware/validateProduct';
import { errorHandler } from '../middleware/errorHandler';

const userRouter: Router = Router();

// user routes
userRouter.post('/register', validateUser, createUser);
userRouter.post('/login', userLogin);
userRouter.post('/update', authenticateToken('user'), validateUpdateUser, userUpdate);
userRouter.get('/profile', [authenticateToken('user'), ...validateId], userProfile);
export default userRouter;
