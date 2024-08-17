import sequelize from '../../src/database/connection';
import { shutdown, app } from '../../src/server';
import request from 'supertest';

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

describe('nothing', () => {
    it('should', async () => {
        const result = await request(app).get('/products/itemPage').query({ id: 1 });
        expect(result.status).toBe(500);
    });
});
