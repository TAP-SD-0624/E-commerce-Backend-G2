import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RoleRequest extends Request {
    user?: {
        role?: string;
    };
}

export const verifyToken = async (req: RoleRequest, res: Response, next: NextFunction) =>{
    const authHeader = req.headers['authorization'];

    try{
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Failed to authenticate token' });
            }
            req.body.user = decoded;
            next();
        });
    }
    catch(err){
        console.log(err);
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }

}



