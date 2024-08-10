import {Router} from 'express';
import {verifyToken} from "../middleware/authorizeMiddleware";
import {validateProduct} from "../middleware/validateProduct";
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById, getProductByName,
    updateProductById
} from "../controllers/productController";


const productRouter: Router = Router();

productRouter.post('/', verifyToken, validateProduct, createProduct);
productRouter.delete('/:id', verifyToken, deleteProductById);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/:id', verifyToken, getProductById);
//! put or patch? partial fields?
productRouter.put('/:id', verifyToken, validateProduct, updateProductById);
productRouter.get('/:name', verifyToken, getProductByName);

// get products by category
//! handbags, watches, skincare, jewelery, apparel
// get products by brand
// get all products
//get product by id

//get newProducts : products within the last 2 weeks
// get Handpicked collection
// ?get product by category & category and brand
// updateProductQuantity for cart
// checkCoupon by code
// add to wishlist
// add to cart
// get itemsByBrand

// addRatings

// reorder the same item by item id

//! select payment method is related to the simulation of the transaction


export default productRouter;