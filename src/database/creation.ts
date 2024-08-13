import { AddressInterface } from './models/address';
import { BrandsInterface } from './models/brands';
import { CategoriesInterface } from './models/categories';
import Images, { ImagesInterface } from './models/Images';
import Orders from './models/orders';
import { ProductsInterface } from './models/products';
import { ProductsCategoriesInterface } from './models/ProductsCategories';
import { RatingsInterface } from './models/ratings';
import { UserInterface } from './models/users';

interface productJson {
    category: string;
    id: any;
    label: any;
    description: any;
    price: any;
    discount: any;
    title: any;
    quantity: any;
    imageUrl: any;
    images: any[];
    tags: any;
    rating: any;
    reviews: any[];
}
interface userJson {
    id: any;
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
    password: any;
    birthDate: any;
    image: any;
    address: any[];
    role: any;
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');
const data: productJson[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const filePath1 = path.join(__dirname, 'users.json');
const people: userJson[] = JSON.parse(fs.readFileSync(filePath1, 'utf8'));

const users: UserInterface[] = [];
const addresses: AddressInterface[] = [];
const categories: CategoriesInterface[] = [];
const products: ProductsInterface[] = [];
const ratings: RatingsInterface[] = [];
const imagesP: ImagesInterface[] = [];
const brands: BrandsInterface[] = [];
const productCategories: ProductsCategoriesInterface[] = [];

for (const productJson of data) {
    let brand = brands.find((br) => br.name == productJson.title);
    if (!brand) {
        brand = {
            id: brands.length + 1,
            name: productJson.title,
            imageUrl: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        brands.push(brand);
    }
    const product: ProductsInterface = {
        id: productJson.id,
        brandId: brand.id!,
        label: productJson.label,
        description: productJson.description,
        price: productJson.price,
        discount: productJson.discount,
        title: productJson.title,
        quantity: productJson.quantity,
        imageUrl: productJson.imageUrl,
        tags: productJson.tags,
        rating: productJson.rating,
        totalRatings: productJson.reviews.length,
        orders: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    products.push(product);

    productJson.reviews.forEach((review) => {
        let userID = people.find((user) => user.email == review.reviewerEmail);
        const rating: RatingsInterface = {
            id: ratings.length + 1,
            productId: productJson.id!,
            userId: userID?.id, // Map this according to your user management
            rating: review.rating,
            review: review.comment,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        ratings.push(rating);
    });

    productJson.images.forEach((image) => {
        const images: ImagesInterface = {
            id: imagesP.length + 1,
            productId: productJson.id,
            imageUrl: image,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        imagesP.push(images);
    });

    let category = categories.find((cat) => cat.title === productJson.category);
    if (!category) {
        category = {
            id: categories.length + 1,
            title: productJson.category,
            imageUrl: '', // Placeholder for category imageUrl
            createdAt: new Date(),
            updatedAt: new Date()
        };
        categories.push(category);
    }

    const productCategory: ProductsCategoriesInterface = {
        id: productCategories.length + 1,
        productId: product.id!,
        categoryId: category.id!,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    productCategories.push(productCategory);
}

for (const userJson of people) {
    const user: UserInterface = {
        id: userJson.id,
        firstName: userJson.firstName,
        lastName: userJson.lastName,
        email: userJson.email,
        phone: userJson.phone,
        password: userJson.password,
        DOB: userJson.birthDate,
        imageUrl: userJson.image,
        role: userJson.role,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    users.push(user);
    userJson.address.forEach((Address) => {
        const addressU: AddressInterface = {
            id: addresses.length + 1,
            userId: userJson.id,
            state: Address.state,
            street: Address.street,
            city: Address.city,
            zipcode: Address.postalCode,
            fullName: userJson.firstName + ' ' + userJson.lastName,
            mobile: userJson.phone,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        addresses.push(addressU);
    });
}

export { imagesP, ratings, products, productCategories, categories, users, addresses, brands };
