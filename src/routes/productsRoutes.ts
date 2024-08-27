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
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const memo = multer.memoryStorage();
export const uploadMiddleware = multer({ storage: memo });
const productRouter: Router = Router();
//general
productRouter.get('/itemPage', validateId, cacheMiddleware,PC.getItemPageById);
productRouter.get('/itemByCategory', validateId, PC.getItemByCategoryId);
productRouter.get('/itemByBrand', validateId, PC.getItemByBrandId);
productRouter.get('/handPickedCollection', validateId, PC.getHandPickedCollectionItems);
productRouter.get('/productSearch', validateSearchValue, PC.searchInItems);
productRouter.get('/newArrivals', PC.getNewArrivalsItems);
//cards
productRouter.get('/itemCardOne', cacheMiddleware, PC.itemsCardOne);
productRouter.get('/itemCardTwo', cacheMiddleware, PC.itemsCardTwo);
productRouter.get('/itemCardThree', cacheMiddleware, PC.itemsCardThree);
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
