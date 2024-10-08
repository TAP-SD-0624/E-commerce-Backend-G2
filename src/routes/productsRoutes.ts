import { Router } from 'express';
import * as PC from '../controllers/productsController';
import {
    validateId,
    validateSearchValue,
    validateProductId,
    validateUserReview,
    validateProduct,
    validateProductUpdate
} from '../middleware/validateProduct';
import authenticateToken from '../utils/tokenUtils';
import multer from 'multer';

const memo = multer.memoryStorage();
export const uploadMiddleware = multer({ storage: memo });
const productRouter: Router = Router();
//general
productRouter.get('/itemPage', validateId, PC.getItemPageById); //Menna
productRouter.get('/itemByCategory', validateId, PC.getItemByCategoryId); //Menna
productRouter.get('/itemByBrand', validateId, PC.getItemByBrandId); //Menna
productRouter.get('/handPickedCollection', validateId, PC.getHandPickedCollectionItems); //Menna
productRouter.get('/productSearch', validateSearchValue, PC.searchInItems); //Menna
productRouter.get('/newArrivals', PC.getNewArrivalsItems); //Menna
//cards
productRouter.get('/itemCardOne', PC.itemsCardOne); //Menna
productRouter.get('/itemCardTwo', PC.itemsCardTwo); //Menna
productRouter.get('/itemCardThree', PC.itemsCardThree); //Menna
//cart
productRouter.post('/addItemToCart', [authenticateToken('user'), ...validateProductId], PC.addItemToCart);
productRouter.delete('/reduceItemFromCart', [authenticateToken('user'), ...validateProductId], PC.reduceItemFromCart);
productRouter.delete('/removeItemFromCart', [authenticateToken('user'), ...validateProductId], PC.removeItemFromCart);
//wishlist
productRouter.post('/toggleItemInWishList', [authenticateToken('user'), ...validateProductId], PC.toggleItemInWishList);
//reviews and rating
productRouter.post('/upsertUserReview', [authenticateToken('user'), ...validateUserReview], PC.upsertUserReviewOrRating);
//////// Admin Only ///////
//crud on products
productRouter.post('/createNewProduct', [authenticateToken('admin'), ...validateProduct], PC.createNewProduct);
productRouter.delete('/deleteProduct', [authenticateToken('admin'), ...validateProductId], PC.deleteProduct);
productRouter.put('/updateProduct', [authenticateToken('admin'), ...validateProductUpdate], PC.updateProduct);
//upload image
productRouter.post('/uploadProductImages', [authenticateToken('admin'), uploadMiddleware.any()], PC.uploadProductImages);

export default productRouter;
