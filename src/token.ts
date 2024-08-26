const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const payload = {
    userId: 123,
    role: 'admin',
};

const options = {
    expiresIn: '1h', // Token will expire in 1 hour
};

const token = jwt.sign(payload, secretKey, options);

console.log(token);