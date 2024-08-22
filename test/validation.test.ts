import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import { generateToken } from '../src/utils/tokenUtils';
let adminToken: string;
let userToken: string;
beforeAll(async () => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening at port ${process.env.PORT || 3000}`);
    });
    adminToken = generateToken(999, 'admin');
    userToken = generateToken(999, 'user');
});
afterAll(async () => {
    shutdown();
});

describe('validateId', () => {
    /* target routes
    1.itemPage
    2.itemByCategory
    3.itemByBrand
    4.handPickedCollection
    */
    it('should response with 422 because of string', async () => {
        const resp = await request(app).get('/products/itemPage').query({ id: 'asd' });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            id: {
                type: 'field',
                value: 'asd',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
    it('should response with 422 because of empty', async () => {
        const resp = await request(app).get('/products/itemByCategory').query({ id: '' });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            id: {
                type: 'field',
                value: '',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
    it('should response with 422 because of 0 value', async () => {
        const resp = await request(app).get('/products/handPickedCollection').query({ id: 0 });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            id: {
                type: 'field',
                value: '0',
                msg: 'Invalid value',
                path: 'id',
                location: 'query'
            }
        });
    });
});
describe('validateSearchValue', () => {
    // target route productSearch
    it('should response with 422 because of empty', async () => {
        const resp = await request(app).get('/products/productSearch').query({ searchValue: '' });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            searchValue: {
                type: 'field',
                value: '',
                msg: 'Invalid value',
                path: 'searchValue',
                location: 'query'
            }
        });
    });
});
describe('validateProductId', () => {
    /* target routes
    10.addItemToCart
    11.reduceItemFromCart
    12.removeItemFromCart
    13.toggleItemInWishList
    16.deleteProduct
    */
    it('should response with 422 because of empty', async () => {
        const resp = await request(app)
            .post('/products/addItemToCart')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${userToken}` })
            .send({ productId: '' });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            productId: {
                type: 'field',
                value: '',
                msg: 'Invalid value',
                path: 'productId',
                location: 'body'
            }
        });
    });
    it('should response with 422 because of string', async () => {
        const resp = await request(app)
            .delete('/products/reduceItemFromCart')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${userToken}` })
            .send({ productId: 'dsad' });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            productId: {
                type: 'field',
                value: 'dsad',
                msg: 'Invalid value',
                path: 'productId',
                location: 'body'
            }
        });
    });
    it('should response with 422 because of zero value', async () => {
        const resp = await request(app)
            .post('/products/toggleItemInWishList')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${userToken}` })
            .send({ productId: 0 });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            productId: {
                type: 'field',
                value: 0,
                msg: 'Invalid value',
                path: 'productId',
                location: 'body'
            }
        });
    });
});
describe('validateUserReview', () => {
    //target route upsertUserReview
    it('should response with 422 because of bad input', async () => {
        const resp = await request(app)
            .post('/products/upsertUserReview')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${userToken}` })
            .send({ productId: 'dsad', newReview: 123, newRating: 0 });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            productId: {
                type: 'field',
                value: 'dsad',
                msg: 'Invalid value',
                path: 'productId',
                location: 'body'
            },
            newReview: {
                type: 'field',
                value: 123,
                msg: 'Invalid value',
                path: 'newReview',
                location: 'body'
            },
            newRating: {
                type: 'field',
                value: 0,
                msg: 'Invalid value',
                path: 'newRating',
                location: 'body'
            }
        });
    });
});
describe('validateProduct', () => {
    // target end point create new item
    //sends an empty body to check for all fields
    it('should response with 422 for bad input', async () => {
        const resp = await request(app)
            .post('/products/createNewProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            brandId: {
                type: 'field',
                msg: 'Brand ID must be a positive integer',
                path: 'brandId',
                location: 'body'
            },
            label: { type: 'field', msg: 'required', path: 'label', location: 'body' },
            description: {
                type: 'field',
                msg: 'required',
                path: 'description',
                location: 'body'
            },
            price: {
                type: 'field',
                msg: 'Price must be a non-negative number',
                path: 'price',
                location: 'body'
            },
            discount: {
                type: 'field',
                msg: 'Discount must be a non-negative number',
                path: 'discount',
                location: 'body'
            },
            title: { type: 'field', msg: 'required', path: 'title', location: 'body' },
            quantity: {
                type: 'field',
                msg: 'Quantity must be a non-negative integer',
                path: 'quantity',
                location: 'body'
            },
            imageUrl: {
                type: 'field',
                msg: 'Invalid value',
                path: 'imageUrl',
                location: 'body'
            },
            categoriesIdsList: {
                type: 'field',
                msg: 'Invalid value',
                path: 'categoriesIdsList',
                location: 'body'
            },
            imagesUrlList: {
                type: 'field',
                msg: 'Invalid value',
                path: 'imagesUrlList',
                location: 'body'
            },
            tags: {
                type: 'field',
                msg: 'Invalid value',
                path: 'tags',
                location: 'body'
            }
        });
    });
});
describe('validateProductUpdate', () => {
    it('should response with 422 for bad input', async () => {
        const resp = await request(app)
            .put('/products/updateProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({
                productId: 'asd',
                brandId: 0,
                label: 'as',
                description: '   ',
                price: '0',
                title: ' a',
                imageUrl: '1234',
                quantity: ' hg ',
                discount: -1
            });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            productId: {
                type: 'field',
                value: 'asd',
                msg: 'Invalid value',
                path: 'productId',
                location: 'body'
            },
            brandId: {
                type: 'field',
                value: 0,
                msg: 'Brand ID must be a positive integer',
                path: 'brandId',
                location: 'body'
            },
            label: {
                type: 'field',
                value: 'as',
                msg: 'Invalid value',
                path: 'label',
                location: 'body'
            },
            description: {
                type: 'field',
                value: '   ',
                msg: 'cant be just spaces',
                path: 'description',
                location: 'body'
            },
            price: {
                type: 'field',
                value: '0',
                msg: 'Price must be a non-negative number',
                path: 'price',
                location: 'body'
            },
            discount: {
                type: 'field',
                value: -1,
                msg: 'Discount must be a non-negative number',
                path: 'discount',
                location: 'body'
            },
            title: {
                type: 'field',
                value: ' a',
                msg: 'Invalid value',
                path: 'title',
                location: 'body'
            },
            quantity: {
                type: 'field',
                value: ' hg ',
                msg: 'Quantity must be a non-negative integer',
                path: 'quantity',
                location: 'body'
            },
            imageUrl: {
                type: 'field',
                value: '1234',
                msg: 'Invalid URL format',
                path: 'imageUrl',
                location: 'body'
            }
        });
    });
});
describe('validateUser', () => {
    // target end points
    // register
    // registerAdmin
    it('should response with 422 for bad input', async () => {
        const resp = await request(app)
            .post('/user/registerAdmin')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({
                lastName: '',
                email: 'aaa222',
                password: '1234',
                phone: ' ',
                DOB: 'aaa',
                imageUrl: 'utl'
            });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            errors: [
                {
                    message: 'First name is required'
                },
                {
                    message: 'First name must be a string'
                },
                {
                    message: 'Last name is required'
                },
                {
                    message: 'Invalid email format'
                },
                {
                    message: 'Password must be at least 6 characters long'
                },
                {
                    message: 'Invalid date format'
                },
                {
                    message: 'Invalid URL format'
                }
            ]
        });
    });
});
describe('validateLogin', () => {
    // target routes
    // register
    // registerAdmin
    it('should response with 422 for bad input', async () => {
        const resp = await request(app)
            .post('/user/login')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({
                email: '',
                password: '1234'
            });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            errors: [
                {
                    message: 'Email is required'
                },
                {
                    message: 'Invalid email format'
                },
                {
                    message: 'E-mail doesnt exist'
                },
                {
                    message: 'Password must be at least 6 characters long'
                }
            ]
        });
    });
});
describe('validateUpdateUser', () => {
    it('should response with 422 for bad input', async () => {
        const resp = await request(app)
            .put('/user/update')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({
                firstName: 'aa',
                lastName: '        ',
                phone: '',
                DOB: '123',
                imageUrl: 'ddd/ddd',
                password: '123'
            });
        expect(resp.status).toBe(422);
        expect(resp.body).toEqual({
            errors: [
                {
                    message: 'Invalid value'
                },
                {
                    message: 'cant be just spaces'
                },
                {
                    message: 'Password must be at least 6 characters long'
                },
                {
                    message: 'Invalid value'
                },
                {
                    message: 'cant be just spaces'
                },
                {
                    message: 'Invalid date format'
                },
                {
                    message: 'Invalid URL format'
                }
            ]
        });
    });
});
describe('testing tokens', () => {
    it('should response with 401 for no token', async () => {
        const resp = await request(app).post('/products/addItemToCart');
        expect(resp.status).toBe(401);
    });
    it('should response with 403 for invalid token', async () => {
        const resp = await request(app).post('/user/registerAdmin').set({ 'Content-type': 'Application/json', Authorization: `bearer asd` });
        expect(resp.status).toBe(403);
    });
    it('should response with 403 for unauthorized role', async () => {
        const resp = await request(app)
            .delete('/products/deleteProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${userToken}` });
        expect(resp.status).toBe(403);
    });
});
