import { Router } from 'express';
import { createUser, userLogin, userUpdate, userProfile } from '../controllers/userController';
import { loginValidate, validateUpdateUser, validateUser } from '../middleware/validateUser';
import authenticateToken from '../utils/tokenUtils';

const userRouter: Router = Router();

// user routes
userRouter.post('/register', validateUser, createUser('user'));
userRouter.post('/registerAdmin', [authenticateToken('admin'), ...validateUser], createUser('admin'));
userRouter.post('/login', loginValidate, userLogin);
userRouter.put('/update', [authenticateToken('user'), ...validateUpdateUser], userUpdate);
userRouter.get('/profile', authenticateToken('user'), userProfile);
export default userRouter;
