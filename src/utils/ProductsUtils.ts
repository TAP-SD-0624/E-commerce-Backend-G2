import { Op } from 'sequelize';
import { db } from '../database';
import sequelize from '../database/connection';
import Products from '../database/models/products';
import Categories from '../database/models/categories';
import Brands from '../database/models/brands';

export async function updateUserReviewTransaction(productId: number, userId: number, newReview?: string, newRating?: number): Promise<boolean> {
    // dont forget to add limitaion to the new review and the new rating like rating should be between 1 and 5
    // productId and userId are mandetory
    // to avoid 0 and '' it should be givin new review and rating in case of creating how ever no error will be thrown
    // add rule for so eather one of rating or review needs to exist
    try {
        const result = await sequelize.transaction(async (t) => {
            //checking if user has review already
            const userHasReview = await db.Ratings.findOne({
                where: { userId, productId }
            });
            if (userHasReview) {
                // if user has a review lets update it
                try {
                    await db.Ratings.update(
                        {
                            // if no new parameters were givin it will inject the old data
                            rating: newRating || userHasReview.rating,
                            review: newReview || userHasReview.review
                        },
                        { where: { id: userHasReview.id } }
                    );
                } catch (error) {
                    throw new Error("couldn't update user existing review");
                }
            } else {
                // if user has no review lets create it
                try {
                    await db.Ratings.create({
                        userId,
                        rating: newRating || 0,
                        review: newReview || '',
                        productId
                    });
                } catch (error) {
                    throw new Error("couldn't create new review");
                }
            }
            // now let's calculate the new avg
            try {
                const newTotalRatings = await db.Ratings.findOne({
                    where: { productId },
                    attributes: [[sequelize.fn('count', sequelize.col('rating')), 'totalRatings']]
                });
                const newAvgRating = await db.Ratings.findOne({
                    where: { productId },
                    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'rating']]
                });
                if (newAvgRating && newTotalRatings) {
                    // if we have a new rating then we need to update it in the products table
                    try {
                        await Products.update(
                            { rating: newAvgRating.dataValues.rating, totalRatings: newTotalRatings.dataValues.totalRatings },
                            { where: { id: productId } }
                        );
                    } catch (error) {
                        throw new Error("couldn't update the new rating");
                    }
                } else {
                    throw new Error("couldn't calculate the rating");
                }
            } catch (error) {
                throw new Error("couldn't calculate the rating");
            }
        });
        return true;
    } catch (error) {
        throw new Error("couldn't complete");
    }
}
export async function createNewProductTransaction(
    // rating and orders can be givin however realistically new product should have any orders or rating
    // always remember that categories and brands should exist first
    brandId: number,
    label: string,
    description: string,
    price: number,
    discount: number,
    title: string,
    imageUrl: string,
    quantity: number,
    categoriesIdsList: Array<number>,
    imagesUrlList: Array<string>,
    tags: Array<string>
) {
    const bulkCategories: Array<{}> = categoriesIdsList.map((i: number): {} => {
        return { categoryId: i };
    });
    const bulkImages: Array<{}> = imagesUrlList.map((i: string): {} => {
        return { imageUrl: i };
    });
    try {
        const result = await sequelize.transaction(async (k) => {
            await db.Products.create(
                {
                    brandId,
                    description,
                    discount,
                    imageUrl,
                    label,
                    price,
                    quantity,
                    title,
                    categoriesIds: bulkCategories,
                    imagesUrls: bulkImages,
                    tags
                },
                {
                    include: [
                        { model: db.ProductsCategories, as: 'categoriesIds' },
                        { model: db.Images, as: 'imagesUrls' }
                    ],

                    transaction: k
                }
            );
        });
        return true;
    } catch (error) {
        throw new Error('couldent complete');
    }
}

// export async function getProductCardById(productId: number): Promise<Products> {
//     try {
//         const product = await db.Products.findByPk(productId, {
//             attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
//             include: [
//                 {
//                     model: db.Brands,
//                     attributes: [
//                         ['id', 'brandId'],
//                         ['name', 'brandTitle']
//                     ]
//                 },
//                 {
//                     model: db.Categories,
//                     attributes: [
//                         ['id', 'categoryId'],
//                         ['title', 'categoryTitle']
//                     ],
//                     through: { attributes: [] }
//                 }
//             ]
//         });
//         return product ? product : false;
//     } catch (error) {
//         throw new Error("could'nt do it");
//     }
// }
export async function getProductPageById(productId: number): Promise<Products> {
    const product = await db.Products.findByPk(productId, {
        attributes: ['id', 'title', 'label', 'description', 'price', 'discount', 'imageUrl', 'rating', 'orders', 'quantity'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            },
            {
                model: db.Images,
                attributes: [['imageUrl', 'galleryImages']],
                as: 'imagesUrls'
            },
            {
                model: db.Ratings,
                attributes: ['review', 'rating'],
                include: [
                    {
                        model: db.Users,
                        attributes: ['firstName', 'lastName']
                    }
                ]
            }
        ]
    });
    if (product) {
        return product;
    } else {
        //add status code after firas
        throw new Error('Product was not found');
    }
}
export async function searchByBrandName(searchValue: string): Promise<Array<Products>> {
    const results = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                where: {
                    name: { [Op.iLike]: `%${searchValue}%` }
                }
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ]
    });
    if (results.length > 0) {
        return results;
    } else {
        return [];
    }
}
export async function searchByProductNameOrTags(searchValue: string): Promise<Array<Products>> {
    const results = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ],
        where: {
            [Op.or]: [{ title: { [Op.iLike]: `%${searchValue}%` } }, { tags: { [Op.contains]: [searchValue] } }]
        }
    });
    if (results.length > 0) {
        return results;
    } else {
        return [];
    }
}
export async function searchForProductsOrBrands(searchValue: string): Promise<Array<Products>> {
    const products = await searchByProductNameOrTags(searchValue);
    const brands = await searchByBrandName(searchValue);
    //error should be added from feras
    if (products.length < 1 && brands.length < 1) throw new Error('no result was found 204');
    return [...products!, ...brands!];
}
export async function deleteProductById(productId: number) {
    //edit database to allow null in forign keys
    try {
        const result = await sequelize.transaction(async (trans) => {
            await db.Products.destroy({ where: { id: productId }, transaction: trans });
            await db.Images.destroy({ where: { productId }, transaction: trans });
        });
    } catch (error) {}
}

export async function getCardOneProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ],
        where: {
            quantity: { [Op.lt]: 20 }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
export async function getCardTwoProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ],
        where: {
            discount: { [Op.gte]: 15 }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
export async function getCardThreeProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ],
        where: {
            rating: { [Op.gte]: 4.5 }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
export async function getProductsByCategoryId(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] },
                where: {
                    id
                }
            }
        ]
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
export async function getProductsByBrandId(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                where: {
                    id
                }
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ]
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}

//preparing the home page
export async function getAllCategories(): Promise<Array<Categories>> {
    const categories = await db.Categories.findAll({ attributes: ['id', 'title', 'imageUrl'] });
    return categories;
}
export async function getAllBrands(): Promise<Array<Brands>> {
    const categories = await db.Brands.findAll({ attributes: ['id', ['name', 'title'], 'imageUrl'] });
    return categories;
}
export async function getNewArrivals(): Promise<Array<Products>> {
    const nowDate = new Date();
    const threeMonthsBefore = nowDate.setMonth(nowDate.getMonth() - 3);
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] }
            }
        ],
        where: {
            createdAt: { [Op.gt]: threeMonthsBefore }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
export async function getHandPickedCollections(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'rating'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ]
            },
            {
                model: db.Categories,
                attributes: [
                    ['id', 'categoryId'],
                    ['title', 'categoryTitle']
                ],
                through: { attributes: [] },
                where: { id }
            }
        ],
        where: {
            [Op.and]: [{ rating: { [Op.gt]: 4.5 } }, { price: { [Op.lt]: 100 } }]
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new Error('nothing');
    }
}
