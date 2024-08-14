import { Router } from 'express';
import {
    addItemToCart,
    getHandPickedCollectionItems,
    getItemByBrandId,
    getItemByCategoryId,
    getItemPageById,
    itemsCardOne,
    itemsCardThree,
    itemsCardTwo,
    searchInItems
} from '../controllers/productsController';
import { validateId, validateSearchValue } from '../middleware/validateProduct';
import authenticateToken from '../utils/tokenUtils';

const productRouter: Router = Router();

productRouter.get('/itemPage', validateId, getItemPageById);
productRouter.get('/itemByCategory', validateId, getItemByCategoryId);
productRouter.get('/itemByBrand', validateId, getItemByBrandId);
productRouter.get('/handPickedCollection', validateId, getHandPickedCollectionItems);
productRouter.get('/productSearch', validateSearchValue, searchInItems);
productRouter.get('/itemCardOne', itemsCardOne);
productRouter.get('/itemCardTwo', itemsCardTwo);
productRouter.get('/itemCardThree', itemsCardThree);
productRouter.post('/addItemToCart', [authenticateToken('user')], addItemToCart);

export default productRouter;
