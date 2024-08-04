import {Router} from 'express';
import {userLogout, userLogin} from '../controllers/userController';


const userRouter: Router = Router();

// login
userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout)

// user routes


export default userRouter;