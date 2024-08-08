import { Request, Response, NextFunction } from 'express';

interface RoleRequest extends Request {
    user?: {
        role?: string;
    };
}
export const checkRole = (allowedRoles: string[]) => {
    return (req: RoleRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role; // Assuming you have user information in req.user
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};