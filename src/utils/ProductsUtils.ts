import { Op, where } from 'sequelize';
import { db } from '../database';
import sequelize from '../database/connection';
import Products from '../database/models/products';
import Categories from '../database/models/categories';
import Brands from '../database/models/brands';
import { CustomError } from '../middleware/customError';

//////////// Delete / Create / Update
export async function updateProductById(
    id: number,
    brandId?: number,
    label?: string,
    description?: string,
    price?: number,
    discount?: number,
    title?: string,
    imageUrl?: string,
    quantity?: number,
    tags?: Array<string>
) {
    const currentProduct = await db.Products.findByPk(id);
    try {
        if (!currentProduct) {
            throw new CustomError('Couldnt find product', 404);
        } else {
            const update = await db.Products.update(
                {
                    brandId: brandId || currentProduct.brandId,
                    label: label || currentProduct.label,
                    description: description || currentProduct.description,
                    price: price || currentProduct.price,
                    discount: discount || currentProduct.discount,
                    title: title || currentProduct.title,
                    imageUrl: imageUrl || currentProduct.imageUrl,
                    quantity: quantity || currentProduct.quantity,
                    tags: tags || currentProduct.tags
                },
                {
                    where: { id }
                }
            );
        }
    } catch (error) {
        throw new CustomError('Opps something went wrong', 500);
    }
}
export async function createNewProductTransaction(
    brandId: number,
    label: string,
    description: string,
    price: number,
    title: string,
    imageUrl: string,
    quantity: number,
    categoriesIdsList: Array<number>,
    imagesUrlList: Array<string>,
    tags: Array<string>,
    discount?: number,
    rating?: number,
    unitsSold?: number
): Promise<void> {
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
                    discount: discount || 0,
                    imageUrl,
                    label,
                    price,
                    quantity,
                    title,
                    categoriesIds: bulkCategories,
                    imagesUrls: bulkImages,
                    tags,
                    rating,
                    unitsSold
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
    } catch (error) {
        console.log(error)
        throw new CustomError('Opps something went wrong', 500);
    }
}
export async function deleteProductById(productId: number): Promise<void> {
    try {
        const result = await sequelize.transaction(async (trans) => {
            await db.Products.destroy({ where: { id: productId }, transaction: trans });
            await db.Images.destroy({ where: { productId }, transaction: trans });
        });
    } catch (error) {
        throw new CustomError('Opps something went wrong', 500);
    }
}
export async function getProductPageById(productId: number): Promise<Products> {
    const product = await db.Products.findByPk(productId, {
        attributes: ['id', 'title', 'label', 'description', 'price', 'discount', 'imageUrl', 'rating', 'unitsSold', 'quantity', 'totalRatings'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
                attributes: ['imageUrl'],
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
        throw new CustomError('Product was not found', 404);
    }
}
export async function searchBar(searchValue: string): Promise<Array<Products>> {
    const results = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
            [Op.or]: [
                { title: { [Op.iLike]: `%${searchValue}%` } },
                { tags: { [Op.contains]: [searchValue] } },
                { '$brand.name$': { [Op.iLike]: `%${searchValue}%` } }
            ]
        }
    });
    if (results.length > 0) {
        return results;
    } else {
        throw new CustomError('no result were found', 404);
    }
}
export async function getCardOneProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
            quantity: { [Op.lte]: 20 }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new CustomError('no result were found', 404);
    }
}
export async function getCardTwoProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
        throw new CustomError('no result were found', 404);
    }
}
export async function getCardThreeProducts(): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
        throw new CustomError('no result were found', 404);
    }
}
export async function getProductsByCategoryId(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
        throw new CustomError('no result were found', 404);
    }
}
export async function getProductsByBrandId(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand',
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
        throw new CustomError('no result were found', 404);
    }
}
//the home page
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
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
            createdAt: { [Op.gte]: threeMonthsBefore }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new CustomError('no result were found', 404);
    }
}
export async function getNewArrivalsHome(): Promise<Array<Products>> {
    const nowDate = new Date();
    const threeMonthsBefore = nowDate.setMonth(nowDate.getMonth() - 3);
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
        limit: 4,
        where: {
            createdAt: { [Op.gte]: threeMonthsBefore }
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new CustomError('no result were found', 404);
    }
}
export async function getHandPickedCollections(id: number): Promise<Array<Products>> {
    const x = await db.Products.findAll({
        attributes: ['id', 'title', 'label', 'price', 'discount', 'imageUrl', 'rating', 'totalRatings', 'unitsSold'],
        include: [
            {
                model: db.Brands,
                attributes: [
                    ['id', 'brandId'],
                    ['name', 'brandTitle']
                ],
                as: 'brand'
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
            [Op.and]: [{ rating: { [Op.gte]: 4.5 } }, { price: { [Op.lte]: 100 } }]
        }
    });
    if (x.length > 0) {
        return x;
    } else {
        throw new CustomError('no result were found', 404);
    }
}
//reviews
export async function updateUserReviewTransaction(productId: number, userId: number, newReview?: string, newRating?: number): Promise<boolean> {
    // dont forget to add limitaion to the new review and the new rating like rating should be between 1 and 5
    // productId and userId are mandetory
    // to avoid 0 and '' it should be givin new review and rating in case of creating how ever no error will be thrown
    // add rule for so eather one of rating or review needs to exist
    if (!newReview && !newRating) throw new CustomError('when updating you should provide at least one new entry as a new review or new rating', 422);
    try {
        const result = await sequelize.transaction(async (t) => {
            //checking if user has review already
            const userHasReview = await db.Ratings.findOne({
                where: { userId, productId },
                transaction: t
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
                        { where: { id: userHasReview.id }, transaction: t }
                    );
                } catch (error) {
                    throw new CustomError("couldn't update user existing review", 500);
                }
            } else {
                // if user has no review lets create it
                try {
                    await db.Ratings.create(
                        {
                            userId,
                            rating: newRating || 0,
                            review: newReview || '',
                            productId
                        },
                        { transaction: t }
                    );
                } catch (error) {
                    throw new CustomError("couldn't create new review", 500);
                }
            }
            // now let's calculate the new avg
            try {
                const newTotalRatings = await db.Ratings.findOne({
                    where: { productId },
                    attributes: [[sequelize.fn('count', sequelize.col('rating')), 'totalRatings']],
                    transaction: t
                });
                const newAvgRating = await db.Ratings.findOne({
                    where: { productId },
                    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'rating']],
                    transaction: t
                });
                if (newAvgRating && newTotalRatings) {
                    // if we have a new rating then we need to update it in the products table
                    try {
                        await Products.update(
                            { rating: newAvgRating.dataValues.rating, totalRatings: newTotalRatings.dataValues.totalRatings },
                            { where: { id: productId }, transaction: t }
                        );
                    } catch (error) {
                        throw new CustomError("couldn't update the new rating", 500);
                    }
                } else {
                    throw new CustomError("couldn't calculate the rating", 500);
                }
            } catch (error) {
                if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
                throw new CustomError("couldn't calculate the rating", 500);
            }
        });
        return true;
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('Opps something went wrong', 500);
    }
}
//cart
export async function reduceFromCart(productId: number, userId: number) {
    try {
        const cartItem = await db.Cart.findOne({ where: { productId, userId } });
        if (cartItem) {
            const x = await db.Cart.destroy({ where: { id: cartItem.id } });
        } else {
            throw new CustomError('cant find the product', 404);
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode);
        throw new CustomError('cant remove the product from cart', 500);
    }
}
export async function deleteFromCart(productId: number, userId: number) {
    try {
        const x = await db.Cart.destroy({ where: { productId, userId } });
    } catch (error) {
        throw new CustomError('cant delete the product from cart', 500);
    }
}
export async function addToCart(productId: number, userId: number) {
    try {
        const x = await db.Cart.create({ productId, userId });
        return x;
    } catch (error) {
        throw new CustomError('cant add the product to cart', 500);
    }
}
//whishlist
export async function toggleWishList(productId: number, userId: number) {
    try {
        const exist = await db.Wishlist.findOne({ where: { productId, userId } });
        if (exist) {
            await db.Wishlist.destroy({ where: { id: exist.id } });
        } else {
            await db.Wishlist.create({ productId, userId });
        }
    } catch (error) {
        throw new CustomError("couldn't complete", 500);
    }
}
//testing
export async function createCategory(title: string, imageUrl: string) {
    try {
        await db.Categories.create({ title, imageUrl });
    } catch (error) {
        throw new CustomError('Opps couldnt make it', 500);
    }
}
export async function createBrand(name: string, imageUrl: string) {
    try {
        await db.Brands.create({ name, imageUrl });
    } catch (error) {
        const err = error as Error;
        throw new CustomError('Opps couldnt make it', 500);
    }
}
