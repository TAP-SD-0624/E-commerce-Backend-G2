import sequelize from '../src/database/connection';
import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import { createUserDB } from '../src/utils/UsersUtils';
import { createUser } from '../src/controllers/userController';
import { log } from 'console';
beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(async () => {
            console.log('connected to the database for testing');
            await sequelize.sync({ alter: true });
        })
        .catch(() => console.log('couldnt connect to the database for testing'));
    server.listen(3001, () => {
        console.log(`server is listening at port ${3001}`);
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
        console.log(resp.body.token);

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
        console.log('-----------________(((((((()&&&&&^%');
        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
});
