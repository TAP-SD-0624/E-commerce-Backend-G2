import sequelize from '../src/database/connection';
import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import * as TH from '../src/utils/ProductsTestHelper';
let genaratedUserToken: string;
beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(async () => {
            console.log('connected to the database for testing');
            await TH.seedTestCategories();
            await TH.seedTestBrands();
            await TH.seedTestProducts();
            await TH.seedTestProductsCategories();
            await sequelize.sync({ alter: true });
        })
        .catch(() => console.log('couldnt connect to the database for testing'));
    server.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening at port ${process.env.PORT || 3000}`);
    });
});
afterAll(async () => {
    shutdown();
    await sequelize.sync({ force: true, match: /_test$/ });
    await sequelize.close();
});

describe('register a user', () => {
    const mockUser = {
        user: {
            firstName: 'feras',
            lastName: 'samih',
            email: 'samih@gmail.com',
            phone: '88776656',
            DOB: '1988-06-05T00:00:00.000Z',
            imageUrl: 'bbb.jpg'
        }
    };
    it('should create and register a user', async () => {
        const response = await request(app).post('/user/register').send({
            firstName: 'feras',
            lastName: 'samih',
            password: '11223344',
            email: 'samih@gmail.com',
            phone: '88776656',
            DOB: '1988-06-05',
            imageUrl: 'bbb.jpg'
        });

        genaratedUserToken = response.body.token;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
    it('should not create a user and response withe 422', async () => {
        const response = await request(app).post('/user/register');

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
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
                    message: 'Last name must be a string'
                },
                {
                    message: 'Email is required'
                },
                {
                    message: 'Invalid email format'
                },
                {
                    message: 'Invalid value'
                },
                {
                    message: 'Password is required'
                },
                {
                    message: 'Password must be at least 6 characters long'
                }
            ]
        });
    });
});

describe('login a user', () => {
    it('should login a user succesfully', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'samih@gmail.com',
            password: '11223344'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
});

describe('update user data', () => {
    it('should update user data(password and DOB) succesfully', async () => {
        const response = await request(app).put('/user/update').set('Authorization', `Bearer ${genaratedUserToken}`).send({
            firstName: 'feras',
            lastName: 'samih',
            password: '111222333',
            phone: '88776656',
            DOB: '1988-06-05',
            imageUrl: 'bbb.jpg'
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: 'User updated succesfullly'
        });
    });
    it('should not update user data(password and DOB) ', async () => {
        const response = await request(app).put('/user/update').send({
            firstName: 'feras',
            lastName: 'samih',
            password: '111222333',
            phone: '88776656',
            DOB: '1988-06-05',
            imageUrl: 'bbb.jpg'
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'No token provided'
        });
    });
});

describe('Get user profile', () => {
    it('should return user profile', async () => {
        const response = await request(app).get('/user/profile').set('Authorization', `Bearer ${genaratedUserToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            firstName: 'feras',
            lastName: 'samih',
            email: 'samih@gmail.com',
            phone: '88776656',
            DOB: '1988-06-05T00:00:00.000Z',
            imageUrl: 'bbb.jpg',
            Carts: [],
            Addresses: [],
            Orders: [],
            Transactions: [],
            Wishlists: [],
            Ratings: []
        });
    });
});

describe('checkout process', () => {
    it('should add an item to the cart', async () => {
        const resp = await request(app)
            .post('/products/addItemToCart')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${genaratedUserToken}` })
            .send({ productId: 1 });
        expect(resp.status).toBe(200);
    });

    it('should get the cart', async () => {
        const resp = await request(app)
            .get('/cart/shoppingCart')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${genaratedUserToken}` });
        expect(resp.status).toBe(200);
    });

    it('should checkout cart', async () => {
        const resp = await request(app)
            .post('/cart/checkout')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${genaratedUserToken}` })
            .send({
                city: 'mumbai',
                state: 'maharashtra',
                street: 'street address',
                mobile: '9876543210',
                zipcode: '400067',
                paymentStatus: 'completed',
                fullName: 'Ramzi Abushahla',
                totalPrice: 200
            });
        expect(resp.status).toBe(200);
    });
});
