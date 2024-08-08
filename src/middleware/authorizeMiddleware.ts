import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RoleRequest extends Request {
    user?: {
        id?: number;
        role?: string;
    };
}


export const authenticate = (req: RoleRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};