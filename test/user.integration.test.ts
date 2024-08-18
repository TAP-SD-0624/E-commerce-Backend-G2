import sequelize from '../src/database/connection';
import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import { createUserDB } from '../src/utils/UsersUtils';
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
