import supertest from 'supertest';
import { app } from '../../src/server';
import { userLogin} from "../../src/controllers/userController";

const request = supertest(app);
console.log(process.env.NODE_ENV);
test('should create user with valid data', async () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe2@example.com',
        password: 'password123',
        phone: '1234567890',
        DOB: '1990-01-01',
        imageUrl: 'https://example.com/avatar.jpg',
        role: 'user',
    };

    const response = await request
        .post('/register')
        .send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toContain('created successfully');

});

test('should return 400 for missing required fields', async () => {
    const user = {
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
    };

    const response = await request
        .post('/register')
        .send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
});

test('should return 400 for invalid email format', async () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalidemail.com',
        password: 'password123',
    };

    const response = await request
        .post('/register')
        .send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
});

test('should login user with valid credentials', async () => {
    // Create a user before testing login
    const user = {
        email: 'johndoe@example.com',
        password: 'password123',
    };

    //

    const loginData = {
        email: 'johndoe@example.com',
        password: 'password123',
    };

    const response = await request
        .post('/login')
        .send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('token');
});

test('should return 400 for invalid email or password', async () => {
    const loginData = {
        email: 'invalid@email.com',
        password: 'wrongpassword',
    };

    const response = await request
        .post('/login')
        .send(loginData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
});
