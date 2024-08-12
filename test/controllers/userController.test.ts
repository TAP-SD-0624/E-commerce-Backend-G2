import Users from '../../src/database/models/users';
import supertest from 'supertest';
import { app, shutdown } from '../../src/server';
import { db } from '../../src/database';
const request = supertest(app);

afterAll(() => {
    shutdown();
});

/*
beforeAll()
*/

// for the same test beforeEach and afterEach

describe('User controller', () => {
    test('should create a user when all required fields are provided', async () => {
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

        const user612 = await Users.create(userData);
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
    });

});

describe('User login', () => {
    test('should login user with valid credentials', async () => {
        // Create a user before testing login
        const user = {
            email: 'johndoe2@example.com',
            password: 'password123'
        };

        const loginData = {
            email: 'johndoe2@example.com',
            password: 'password123'
        };

        const response = await request
            .post('/login')
            .send(loginData);

        expect(response.statusCode).toBe(200);
    });



});
//! deletes the table after all tests are done use with caution when login in and editing
/*
afterAll(async ()=> {//clears the table
   await  db.Users.sync({ force: true, match: /_test$/ });})
 */