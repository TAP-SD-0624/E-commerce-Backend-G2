import sequelize from '../src/database/connection';
import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import { createUserDB } from '../src/utils/UsersUtils';
let genaratedUserToken: string;
beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(async () => {
            console.log('connected to the database for testing');
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

describe('integrate user and gest tasks', () => {
    it('should create an admin', async () => {
        const user = await createUserDB('admin', 'amr', 'imad', 'amr@gmail.com', '123456', '+00970', Date.parse('2002/02/02'), 'image/url.com');
        expect(user).toBeTruthy();
    });
    it('should login user', async () => {
        const resp = await request(app)
            .post('/user/login')
            .set({ 'Content-type': 'Application/json' })
            .send({ email: 'amr@gmail.com', password: '123456' });
        expect(resp.status).toEqual(201);
    });
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
