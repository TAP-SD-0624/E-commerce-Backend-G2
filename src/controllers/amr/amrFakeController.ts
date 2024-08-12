// // product productCategory category
//
// import { db } from '../../database';
// import sequelize from '../../database/connection';
// // create new category
// export async function createNewCategory(imageUrl: string, title: string) {
//     try {
//         await db.Categories.create({
//             imageUrl,
//             title
//         });
//     } catch (error) {
//         throw new Error('couldent complete');
//     }
// }
// ////////////////// worng way to do it////////////
// // create new product without category
// export async function createNewProduct(
//     brandId: number,
//     label: string,
//     description: string,
//     price: number,
//     discount: number,
//     title: string,
//     image: string,
//     quantity: number
// ) {
//     try {
//         await db.Products.create({
//             brandId,
//             description,
//             discount,
//             imageUrl: image,
//             label,
//             price,
//             quantity,
//             title
//         });
//     } catch (error) {
//         console.log(error);
//
//         throw new Error('couldent complete');
//     }
// }
// ////////////////// right way to do it////////////
// ////////////////// warning
// // categories should be an array
// export async function createNewProductWithCat(
//     brandId: number,
//     label: string,
//     description: string,
//     price: number,
//     discount: number,
//     title: string,
//     image: string,
//     quantity: number,
//     categoriesIds: Array<number>
// ) {
//     try {
//         const result = await sequelize.transaction(async (t) => {
//             const bulkCategories: Array<{}> = categoriesIds.map((i: number): {} => {
//                 return { categoryId: i };
//             });
//             await db.Products.create(
//                 {
//                     brandId,
//                     description,
//                     discount,
//                     imageUrl: image,
//                     label,
//                     price,
//                     quantity,
//                     title,
//                     categoriesIds: bulkCategories
//                 },
//                 {
//                     include: [{ model: db.ProductsCategories, as: 'categoriesIds' }],
//                     transaction: t
//                 }
//             );
//         });
//     } catch (error) {
//         throw new Error('couldent complete');
//     }
// }
// // list all the products alone
// export async function listAllProducts() {
//     return await db.Products.findAll({
//         attributes: ['title', 'price']
//     });
// }
// // list all the products with all conected tables
// export async function listAllProductsWithAs() {
//     return await db.Products.findAll({
//         attributes: ['id', 'title', 'price'],
//         include: [
//             { model: db.Brands, attributes: ['name'] },
//             { model: db.Images, attributes: ['imageUrl'], as: 'imagesUrls' },
//             { model: db.Categories, attributes: ['title'], through: { attributes: [] } },
//             { model: db.Cart }
//         ]
//     });
// }
// //
// //1.category needs to exist first
// //1-1.this function will recive an array of categories and will associate them all with the given item
// //2.images will be given as url list and all will be add
// //3.brands needs to exist first
// export async function createNewProductWithAll(
//     brandId: number,
//     label: string,
//     description: string,
//     price: number,
//     discount: number,
//     title: string,
//     image: string,
//     quantity: number,
//     categoriesIdsList: Array<number>,
//     imagesUrlList: Array<string>
// ) {
//     const bulkCategories: Array<{}> = categoriesIdsList.map((i: number): {} => {
//         return { categoryId: i };
//     });
//     const bulkImages: Array<{}> = imagesUrlList.map((i: string): {} => {
//         return { imageUrl: i };
//     });
//     try {
//         const result = await sequelize.transaction(async (t) => {
//             await db.Products.create(
//                 {
//                     brandId,
//                     description,
//                     discount,
//                     imageUrl: image,
//                     label,
//                     price,
//                     quantity,
//                     title,
//                     categoriesIds: bulkCategories,
//                     imagesUrls: bulkImages
//                 },
//                 {
//                     include: [
//                         { model: db.ProductsCategories, as: 'categoriesIds' },
//                         { model: db.Images, as: 'imagesUrls' }
//                     ],
//
//                     transaction: t
//                 }
//             );
//         });
//     } catch (error) {
//         throw new Error('couldent complete');
//     }
// }
