import {Router} from 'express';
//import {createAdmin, prohibitedRoute} from '../controllers/userController';
import {checkRole} from '../middleware/checkRole';
import {verifyToken} from '../middleware/authorizeMiddleware';
import {validateUser} from '../middleware/validateUser';
//import {validateProduct} from "../middleware/validateProduct";
import {createProduct} from "../controllers/productController";


const adminRouter: Router = Router();

// Admin checks routes
//adminRouter.use(checkRole(['admin']));

//adminRouter.post("/", validateUser, createAdmin);
//adminRouter.get('/', verifyToken, prohibitedRoute);



// adminRouter.delete('/product/:id', verifyToken, deleteProductById);
// adminRouter.patch('/product/:id', verifyToken, updateProductById);
// adminRouter.get('/:id', verifyToken, getProductById);
// adminRouter.get('/', verifyToken, getAllProducts);
// adminRouter.get('/category/:category', verifyToken, getProductsFromCategory);
// set discount to products
// set selected items by certain category
// get items by rating
// get most bought items within a period
// get items not sold
//! drop items by lowest rating and not sold???
// get all items by country / geolocation
// get all items sold where to ten sold items by country



export default adminRouter;




