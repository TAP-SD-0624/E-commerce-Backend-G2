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
const users_1 = __importDefault(require("../../src/database/models/users"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const request = (0, supertest_1.default)(server_1.app);
afterAll(() => {
    (0, server_1.shutdown)();
});
/*
beforeAll()
*/
// for the same test beforeEach and afterEach
describe('User controller', () => {
    test('should create a user when all required fields are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            password: 'password123',
            DOB: new Date('1990-01-01'),
            imageUrl: 'http://example.com/image.jpg',
            role: 'user'
        };
        const user = yield users_1.default.create(userData);
        expect(user).toBeDefined();
        expect(user.firstName).toBe(userData.firstName);
        expect(user.lastName).toBe(userData.lastName);
        expect(user.email).toBe(userData.email);
        expect(user.phone).toBe(userData.phone);
        expect(user.password).toBe(userData.password);
        //! edit
        expect(new Date(user.DOB).toISOString().slice(0, 10)).toBe('1990-01-01');
        expect(user.imageUrl).toBe(userData.imageUrl);
        expect(user.role).toBe(userData.role);
    }));
});
describe('User login', () => {
    test('should login user with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user before testing login
        const user = {
            email: 'johndoe2@example.com',
            password: 'password123'
        };
        const loginData = {
            email: 'johndoe2@example.com',
            password: 'password123'
        };
        const response = yield request
            .post('/login')
            .send(loginData);
        expect(response.statusCode).toBe(200);
    }));
});
//! deletes the table after all tests are done use with caution when login in and editing
/*
afterAll(async ()=> {//clears the table
   await  db.Users.sync({ force: true, match: /_test$/ });})
 */ 
