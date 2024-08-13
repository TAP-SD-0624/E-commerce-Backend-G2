import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: number; // Adjust if the user ID is a different type
}

export const generateToken = (userId: number): string => {
    const payload: TokenPayload = { userId };

    // Sign the token with a secret key and set an expiration time (optional)
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '1h' // Token expiration time
    });

    return token;
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        req.body.decoded = decoded as TokenPayload; // Attach decoded token to the request body
        next();
    });
};

export default authenticateToken;
