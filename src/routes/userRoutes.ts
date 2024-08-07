import {Router} from 'express';
import {createUser, userLogin, userLogout} from '../controllers/userController';


const userRouter: Router = Router();

// user routes
userRouter.post('/users', createUser);
userRouter.post('/login',userLogin);
userRouter.post('/logout', userLogout);


export default userRouter;