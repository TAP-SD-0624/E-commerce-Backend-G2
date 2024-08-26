import { db } from '../database';
export const seedTestProducts = async () => {
    await db.Products.bulkCreate([
        {
            title: 'hand bag',
            label: 'black',
            description: 'leather',
            price: 10,
            discount: 0,
            quantity: 100,
            imageUrl: 'url/url',
            brandId: 2,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'backpack',
            label: 'travel',
            description: 'big',
            price: 150,
            discount: 10,
            quantity: 20,
            imageUrl: 'url/url',
            brandId: 2,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'ara',
            label: 'shoes',
            description: 'sports',
            price: 300,
            discount: 20,
            quantity: 174,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'jordan',
            label: 'shoes',
            description: 'basketball',
            price: 700,
            discount: 30,
            quantity: 543,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'airmax',
            label: 'shoes',
            description: 'casual',
            price: 562,
            discount: 7,
            quantity: 255,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'cowboy Hat',
            label: 'hat',
            description: 'summer',
            price: 15,
            discount: 20,
            quantity: 70,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'iphone 14',
            label: '14 pro max',
            description: 'brand new',
            price: 333,
            discount: 12,
            quantity: 19,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'galaxy s23',
            label: 's23 ultra',
            description: 'the new samsung phone',
            price: 99,
            discount: 15,
            quantity: 1010,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 5,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'air pods 3',
            label: 'apple earbuds',
            description: 'noise canceling earbuds',
            price: 100,
            discount: 13,
            quantity: 700,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 4.5,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'smart tablelamp',
            label: 'usb c',
            description: 'smart wifi table lamp',
            price: 15,
            discount: 7,
            quantity: 5,
            imageUrl: 'url/url',
            brandId: 1,
            tags: ['black', 'women'],
            rating: 3,
            unitsSold: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
};
export const seedTestCategories = async () => {
    await db.Categories.bulkCreate([
        {
            title: 'HandBags',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Watches',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Skincare',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
};
export const seedTestBrands = async () => {
    await db.Brands.bulkCreate([
        {
            name: 'd&g',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Zara',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'CHANEL',
            imageUrl: 'url/url',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
};
export const seedTestProductsCategories = async () => {
    await db.ProductsCategories.bulkCreate([
        {
            productId: 1,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 1,
            categoryId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 2,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 6,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 7,
            categoryId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 3,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 4,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 1,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 8,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            productId: 9,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
};
export const newArrivalsResults = [
    {
        id: 2,
        title: 'ara',
        label: 'test',
        price: 22,
        discount: 222,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 3,
            brandTitle: 'CHANEL'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'HandBags'
            }
        ]
    },
    {
        id: 6,
        title: 'cowboy Hat',
        label: 'hat',
        price: 15,
        discount: 20,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 7,
        title: 'iphone 14',
        label: '14 pro max',
        price: 333,
        discount: 12,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 3,
                categoryTitle: 'Skincare'
            }
        ]
    },
    {
        id: 3,
        title: 'ara',
        label: 'shoes',
        price: 300,
        discount: 20,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 4,
        title: 'jordan',
        label: 'shoes',
        price: 700,
        discount: 30,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 8,
        title: 'galaxy s23',
        label: 's23 ultra',
        price: 99,
        discount: 15,
        imageUrl: 'url/url',
        rating: 5,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 9,
        title: 'air pods 3',
        label: 'apple earbuds',
        price: 100,
        discount: 13,
        imageUrl: 'url/url',
        rating: 4.5,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 11,
        title: 'title',
        label: 'label',
        price: 1,
        discount: 1,
        imageUrl: 'www.image/url.com',
        rating: 0,
        totalRatings: 0,
        unitsSold: 0,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'HandBags'
            },
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 10,
        title: 'smart tablelamp',
        label: 'usb c',
        price: 15,
        discount: 7,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: []
    },
    {
        id: 5,
        title: 'airmax',
        label: 'shoes',
        price: 562,
        discount: 7,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: []
    }
];
export const cardOneResults = [
    {
        id: 2,
        title: 'ara',
        label: 'test',
        price: 22,
        discount: 222,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 3,
            brandTitle: 'CHANEL'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'HandBags'
            }
        ]
    },
    {
        id: 7,
        title: 'iphone 14',
        label: '14 pro max',
        price: 333,
        discount: 12,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 3,
                categoryTitle: 'Skincare'
            }
        ]
    },
    {
        id: 11,
        title: 'title',
        label: 'label',
        price: 1,
        discount: 1,
        imageUrl: 'www.image/url.com',
        rating: 0,
        totalRatings: 0,
        unitsSold: 0,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'HandBags'
            },
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 10,
        title: 'smart tablelamp',
        label: 'usb c',
        price: 15,
        discount: 7,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: []
    }
];
export const cardTwoResults = [
    {
        id: 2,
        title: 'ara',
        label: 'test',
        price: 22,
        discount: 222,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 3,
            brandTitle: 'CHANEL'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'HandBags'
            }
        ]
    },
    {
        id: 6,
        title: 'cowboy Hat',
        label: 'hat',
        price: 15,
        discount: 20,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 3,
        title: 'ara',
        label: 'shoes',
        price: 300,
        discount: 20,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 4,
        title: 'jordan',
        label: 'shoes',
        price: 700,
        discount: 30,
        imageUrl: 'url/url',
        rating: 3,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 8,
        title: 'galaxy s23',
        label: 's23 ultra',
        price: 99,
        discount: 15,
        imageUrl: 'url/url',
        rating: 5,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    }
];
export const cardThreeResults = [
    {
        id: 8,
        title: 'galaxy s23',
        label: 's23 ultra',
        price: 99,
        discount: 15,
        imageUrl: 'url/url',
        rating: 5,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    },
    {
        id: 9,
        title: 'air pods 3',
        label: 'apple earbuds',
        price: 100,
        discount: 13,
        imageUrl: 'url/url',
        rating: 4.5,
        totalRatings: 0,
        unitsSold: 7,
        brand: {
            brandId: 1,
            brandTitle: 'd&g'
        },
        Categories: [
            {
                categoryId: 2,
                categoryTitle: 'Watches'
            }
        ]
    }
];
export const homePageResults = {
    categories: [
        {
            id: 1,
            title: 'HandBags',
            imageUrl: 'url/url'
        },
        {
            id: 2,
            title: 'Watches',
            imageUrl: 'url/url'
        },
        {
            id: 3,
            title: 'Skincare',
            imageUrl: 'url/url'
        }
    ],
    brands: [
        {
            id: 1,
            title: 'd&g',
            imageUrl: 'url/url'
        },
        {
            id: 2,
            title: 'Zara',
            imageUrl: 'url/url'
        },
        {
            id: 3,
            title: 'CHANEL',
            imageUrl: 'url/url'
        }
    ],
    newArrivals: [
        {
            id: 6,
            title: 'cowboy Hat',
            label: 'hat',
            price: 15,
            discount: 20,
            imageUrl: 'url/url',
            rating: 3,
            totalRatings: 0,
            unitsSold: 7,
            brand: {
                brandId: 1,
                brandTitle: 'd&g'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'Watches'
                }
            ]
        },
        {
            id: 5,
            title: 'airmax',
            label: 'shoes',
            price: 562,
            discount: 7,
            imageUrl: 'url/url',
            rating: 3,
            totalRatings: 0,
            unitsSold: 7,
            brand: {
                brandId: 1,
                brandTitle: 'd&g'
            },
            Categories: []
        },
        {
            id: 4,
            title: 'jordan',
            label: 'shoes',
            price: 700,
            discount: 30,
            imageUrl: 'url/url',
            rating: 3,
            totalRatings: 0,
            unitsSold: 7,
            brand: {
                brandId: 1,
                brandTitle: 'd&g'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'Watches'
                }
            ]
        },
        {
            id: 3,
            title: 'ara',
            label: 'shoes',
            price: 300,
            discount: 20,
            imageUrl: 'url/url',
            rating: 3,
            totalRatings: 0,
            unitsSold: 7,
            brand: {
                brandId: 1,
                brandTitle: 'd&g'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'Watches'
                }
            ]
        }
    ]
};
export const itemPageResults = {
    id: 2,
    title: 'ara',
    label: 'test',
    description: 'test',
    price: 22,
    discount: 222,
    imageUrl: 'url/url',
    rating: 3,
    unitsSold: 7,
    quantity: 20,
    totalRatings: 0,
    brand: { brandId: 3, brandTitle: 'CHANEL' },
    Categories: [{ categoryId: 1, categoryTitle: 'HandBags' }],
    imagesUrls: [],
    Ratings: []
};
export const createProductResults = {
    brandId: 1,
    label: 'label',
    description: 'description',
    price: 1,
    title: 'title',
    imageUrl: 'www.image/url.com',
    quantity: 1,
    categoriesIdsList: [1, 2],
    imagesUrlList: ['1/url', '2/url'],
    tags: ['tag1', 'tag2'],
    discount: 1
};
export const createProductBadConstrain = {
    brandId: 1,
    label: 'label',
    description: 'description',
    price: 1,
    title: 'title',
    imageUrl: 'www.image/url.com',
    quantity: 1,
    categoriesIdsList: [1, 99],
    imagesUrlList: ['1/url', '2/url'],
    tags: ['tag1', 'tag2'],
    discount: 1
};

export const checkoutAddress = {
    brandId: 1,
    label: 'label',
    description: 'description',
    price: 1,
    title: 'title',
    imageUrl: 'www.image/url.com',
    quantity: 1,
    categoriesIdsList: [1, 99],
    imagesUrlList: ['1/url', '2/url'],
    tags: ['tag1', 'tag2'],
    discount: 1
};
