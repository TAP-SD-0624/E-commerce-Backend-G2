// import { Router } from 'express';
// import {
//     createNewProduct,
//     createNewCategory,
//     listAllProducts,
//     listAllProductsWithAs,
//     createNewProductWithCat,
//     createNewProductWithAll
// } from './amrFakeController';
// const amrFakeRouter: Router = Router();
//
// amrFakeRouter.post('/createNewCategory', async (req, res) => {
//     try {
//         const { imageUrl, title } = req.body;
//         await createNewCategory(imageUrl, title);
//         res.sendStatus(200);
//     } catch (error) {
//         res.sendStatus(500);
//     }
// });
//
// amrFakeRouter.post('/createNewProduct', async (req, res) => {
//     try {
//         const { brandId, description, discount, image, label, price, quantity, title } = req.body;
//         await createNewProduct(brandId, label, description, price, discount, title, image, quantity);
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });
//
// amrFakeRouter.get('/listAllProducts', async (req, res) => {
//     const resp = await listAllProducts();
//     res.send(resp);
// });
// export default amrFakeRouter;
//
// amrFakeRouter.get('/listAllProductsWithAs', async (req, res) => {
//     const resp = await listAllProductsWithAs();
//     res.send(resp);
// });
// amrFakeRouter.post('/createNewProductWithCat', async (req, res) => {
//     try {
//         const { brandId, description, discount, image, label, price, quantity, title, categoriesIds } = req.body;
//         await createNewProductWithCat(brandId, label, description, price, discount, title, image, quantity, categoriesIds);
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });
// amrFakeRouter.post('/createNewProductWithAll', async (req, res) => {
//     try {
//         const { brandId, description, discount, image, label, price, quantity, title, categoriesIds, imagesUrlList } = req.body;
//         await createNewProductWithAll(brandId, label, description, price, discount, title, image, quantity, categoriesIds, imagesUrlList);
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });
