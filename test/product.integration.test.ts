import sequelize from '../src/database/connection';
import { shutdown, app, server } from '../src/server';
import request from 'supertest';
import { generateToken } from '../src/utils/tokenUtils';
import * as TH from '../src/utils/ProductsTestHelper';
let adminToken: string;
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
            adminToken = generateToken(999, 'admin');
        })
        .catch(() => console.log('couldnt connect to the database for testing'));
    server.listen(3000, () => {
        console.log(`server is listening at port ${3000}`);
    });
});
afterAll(async () => {
    shutdown();
    await sequelize.sync({ force: true, match: /_test$/ });
    await sequelize.close();
});

describe('crud on products', () => {
    it('create product', async () => {
        const createResp = await request(app)
            .post('/products/createNewProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send(TH.createProductResults);
        expect(createResp.status).toBe(200);
    });
    it('create product with bad category id', async () => {
        const createResp = await request(app)
            .post('/products/createNewProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send(TH.createProductBadConstrain);
        expect(createResp.status).toBe(500);
    });
    it('delete product', async () => {
        const deleteResp = await request(app)
            .delete('/products/deleteProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({ productId: 1 });
        expect(deleteResp.status).toBe(202);
    });
    it('update product', async () => {
        const updateResp = await request(app)
            .put('/products/updateProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({ productId: 2, brandId: 3, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 });
        expect(updateResp.status).toBe(202);
    });
    it('update product that doesnt exist', async () => {
        const updateResp = await request(app)
            .put('/products/updateProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({ productId: 99, brandId: 3, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 });
        expect(updateResp.status).toBe(500);
    });
    it('update product to a brand that doesnt exist', async () => {
        const updateResp = await request(app)
            .put('/products/updateProduct')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${adminToken}` })
            .send({ productId: 1, brandId: 99, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 });
        expect(updateResp.status).toBe(500);
    });
    it('get item page', async () => {
        const getPageResp = await request(app).get('/products/itemPage').query({ id: 2 });
        expect(getPageResp.status).toBe(200);
        expect(getPageResp.body).toEqual(TH.itemPageResults);
    });
});
describe('testing products end points', () => {
    it('should get all the products in category 2', async () => {
        const getPageResp = await request(app).get('/products/itemByCategory').query({ id: 2 });
        expect(getPageResp.status).toBe(200);
        expect(getPageResp.body).toHaveLength(6);
    });
    it('should get all the products in brand 3', async () => {
        const getPageResp = await request(app).get('/products/itemByBrand').query({ id: 3 });
        expect(getPageResp.status).toBe(200);
        expect(getPageResp.body).toHaveLength(1);
    });
    it('should get all handPickedCollection', async () => {
        const handPickedResp = await request(app).get('/products/handPickedCollection').query({ id: 2 });
        expect(handPickedResp.status).toBe(200);
        expect(handPickedResp.body).toHaveLength(2);
    });
    it('should search for product by name or brand', async () => {
        const searchResp = await request(app).get('/products/productSearch').query({ searchValue: 'ara' });
        expect(searchResp.status).toBe(200);
        expect(searchResp.body).toHaveLength(2);
    });
    it('should test home page', async () => {
        const homePageResp = await request(app).get('/homePage');
        expect(homePageResp.status).toBe(200);
        expect(homePageResp.body).toEqual(TH.homePageResults);
    });
    it('should test NewArraivals', async () => {
        const homePageResp = await request(app).get('/products/newArrivals');
        expect(homePageResp.status).toBe(200);
        expect(homePageResp.body).toEqual(TH.newArrivalsResults);
    });
    it('should test card one', async () => {
        const homePageResp = await request(app).get('/products/itemCardOne');
        expect(homePageResp.status).toBe(200);
        expect(homePageResp.body).toEqual(TH.cardOneResults);
    });
    it('should test card two', async () => {
        const homePageResp = await request(app).get('/products/itemCardTwo');
        expect(homePageResp.status).toBe(200);
        expect(homePageResp.body).toEqual(TH.cardTwoResults);
    });
    it('should test card three', async () => {
        const homePageResp = await request(app).get('/products/itemCardThree');
        expect(homePageResp.status).toBe(200);
        expect(homePageResp.body).toEqual(TH.cardThreeResults);
    });
});
