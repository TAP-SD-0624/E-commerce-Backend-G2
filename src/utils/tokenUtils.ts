import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: number; // Adjust if the user ID is a different type
    role: string;
}

export const generateToken = (userId: number, role: string): string => {
    const payload: TokenPayload = { userId, role };
    // Sign the token with a secret key and set an expiration time (optional)
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);
    return token;
};
const authenticateToken = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
            if (err || !decoded) {
                return res.status(403).json({ message: 'Token is not valid' });
            }
            req.body.decoded = decoded as TokenPayload; // Attach decoded token to the request body
            if (req.body.decoded.role === 'admin') {
                next();
            } else if (req.body.decoded.role === 'user' && requiredRole === 'user') {
                next();
            } else {
                return res.status(403).json({ message: 'unauthorized' });
            }
        });
    };
};

export default authenticateToken;
