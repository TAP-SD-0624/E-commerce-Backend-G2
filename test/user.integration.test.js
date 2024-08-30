"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../src/database/connection"));
const server_1 = require("../src/server");
const supertest_1 = __importDefault(require("supertest"));
const UsersUtils_1 = require("../src/utils/UsersUtils");
let genaratedUserToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('connected to the database for testing');
        yield connection_1.default.sync({ alter: true });
    }))
        .catch(() => console.log('couldnt connect to the database for testing'));
    server_1.server.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening at port ${process.env.PORT || 3000}`);
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, server_1.shutdown)();
    yield connection_1.default.sync({ force: true, match: /_test$/ });
    yield connection_1.default.close();
}));
describe('integrate user and gest tasks', () => {
    it('should create an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, UsersUtils_1.createUserDB)('admin', 'amr', 'imad', 'amr@gmail.com', '123456', '+00970', Date.parse('2002/02/02'), 'image/url.com');
        expect(user).toBeTruthy();
    }));
    it('should login user', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield (0, supertest_1.default)(server_1.app)
            .post('/user/login')
            .set({ 'Content-type': 'Application/json' })
            .send({ email: 'amr@gmail.com', password: '123456' });
        expect(resp.status).toEqual(201);
    }));
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
    it('should create and register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/user/register').send({
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
    }));
    it('should not create a user and response withe 422', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/user/register');
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
    }));
});
describe('login a user', () => {
    it('should login a user succesfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/user/login').send({
            email: 'samih@gmail.com',
            password: '11223344'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    }));
});
describe('update user data', () => {
    it('should update user data(password and DOB) succesfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).put('/user/update').set('Authorization', `Bearer ${genaratedUserToken}`).send({
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
    }));
    it('should not update user data(password and DOB) ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).put('/user/update').send({
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
    }));
});
describe('Cart and Checkout Operations', () => {
    it('should add an item to the cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield (0, supertest_1.default)(server_1.app)
            .post('/products/addItemToCart')
            .set({ 'Content-type': 'Application/json', Authorization: `bearer ${genaratedUserToken}` })
            .send({ productId: 1 });
        expect(resp.status).toBe(200);
    }));
});
