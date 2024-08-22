import { Result } from 'express-validator';
import sequelize from '../../src/database/connection';
import { shutdown, app } from '../../src/server';
import request from 'supertest';
import { error } from 'console';

beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(async () => {
            console.log('connected to the database for testing');
            await sequelize.sync({ alter: true });
        })
        .catch(() => console.log('couldnt connect to the database for testing'));
});
afterAll(async () => {
    shutdown();
    await sequelize.close();
});

describe('Get Products By Category Id ', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 2,
            title: 'Glamour Beauty',
            label: 'Eyeshadow Palette with Mirror',
            price: 20,
            discount: 6,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
            rating: 3.333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 2,
                brandTitle: 'Glamour Beauty'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products for a valid category ID', async () => {
        const response = await request(app).get('/products/itemByCategory').query({ id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return a 404 error if no category are found', async () => {
        const response = await request(app).get('/products/itemByCategory').query({ id: 16 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it('should return a 422 error if the id not valid', async () => {
        const response = await request(app).get('/products/itemByCategory').query({ id: 'K' });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            id: {
                type: 'field',
                value: 'K',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
});

describe('Get Products by Brand Id', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products for a valid Brand ID', async () => {
        const response = await request(app).get('/products/itemByBrand').query({ id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return a 404 error if no Brand are found', async () => {
        const response = await request(app).get('/products/itemByBrand').query({ id: 12 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it('should return a 422 error if the id not valid', async () => {
        const response = await request(app).get('/products/itemByBrand').query({ id: ' ' });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            id: {
                type: 'field',
                value: ' ',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
});

describe('Get hand Picked Collection Where the product have rating more than 4.5 and the price is more than 100', () => {
    const mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products which meet the required qualifications', async () => {
        const response = await request(app).get('/products/handPickedCollection').query({ id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return a 404 error if there is no products meet the required qualifications', async () => {
        const response = await request(app).get('/products/handPickedCollection').query({ id: 2 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it('should return a 422 error if the id not valid', async () => {
        const response = await request(app).get('/products/handPickedCollection').query({ id: '*' });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            id: {
                type: 'field',
                value: '*',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
});

describe('Get Product by Product Id', () => {
    const mockProducts = {
        id: 1,
        title: 'Essence',
        label: 'Essence Mascara Lash Princess',
        description:
            'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        price: 10,
        discount: 7,
        imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
        rating: 3,
        unitsSold: 0,
        quantity: 5,
        totalRatings: 3,
        brand: {
            brandId: 1,
            brandTitle: 'Essence'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'beauty'
            }
        ],
        imagesUrls: [
            {
                imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'
            }
        ],
        Ratings: [
            {
                review: 'Very unhappy with my purchase!',
                rating: 2,
                User: {
                    firstName: 'Emily',
                    lastName: 'Johnson'
                }
            },
            {
                review: 'Not as described!',
                rating: 2,
                User: {
                    firstName: 'Michael',
                    lastName: 'Williams'
                }
            },
            {
                review: 'Very satisfied!',
                rating: 5,
                User: {
                    firstName: 'Sophia',
                    lastName: 'Brown'
                }
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return product for a valid Brand ID', async () => {
        const response = await request(app).get('/products/itemPage').query({ id: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return a 404 error if no Product found', async () => {
        const response = await request(app).get('/products/itemPage').query({ id: 40 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it('should return a 422 error if the id not valid', async () => {
        const response = await request(app).get('/products/itemPage').query({ id: '/' });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            id: {
                type: 'field',
                value: '/',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
});

describe('Get All the Products that have less than 20 item', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 6,
            title: 'Calvin Klein',
            label: 'Calvin Klein CK One',
            price: 50,
            discount: 0,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 6,
                brandTitle: 'Calvin Klein'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 9,
            title: 'Dolce & Gabbana',
            label: 'Dolce Shine Eau de',
            price: 70,
            discount: 11,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png',
            rating: 3.3333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 9,
                brandTitle: 'Dolce & Gabbana'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 12,
            title: 'Dior',
            label: "Dior Women's Leather Bag",
            price: 130,
            discount: 8,
            imageUrl: "https://cdn.dummyjson.com/products/images/womens-bags/Heshe%20Women's%20Leather%20Bag/imageUrl.png",
            rating: 4.333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 8,
                brandTitle: 'Dior'
            },
            Categories: [
                {
                    categoryId: 3,
                    categoryTitle: 'womens-bags'
                }
            ]
        }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products which meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardOne');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return error 404 if no products meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardOne');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});

describe('Get All the Products that have more than 15% discount', () => {
    const mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 7,
            title: 'Chanel',
            label: 'Chanel Coco Noir Eau De',
            price: 130,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 7,
                brandTitle: 'Chanel'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 8,
            title: 'Dior',
            label: "Dior J'adore",
            price: 90,
            discount: 17,
            imageUrl: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
            rating: 4.3333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 8,
                brandTitle: 'Dior'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 13,
            title: 'Prada',
            label: 'Prada Women Bag',
            price: 600,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/womens-bags/Prada%20Women%20Bag/imageUrl.png',
            rating: 4,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 11,
                brandTitle: 'Prada'
            },
            Categories: [
                {
                    categoryId: 3,
                    categoryTitle: 'womens-bags'
                }
            ]
        }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products which meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardTwo');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return error 404 if no products meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardTwo');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});

describe('Get All the Products that have more than 4.5 Rating', () => {
    const mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return products which meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardThree');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should return error 404 if no products meet the required qualifications', async () => {
        const response = await request(app).get('/products/itemCardThree');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});
