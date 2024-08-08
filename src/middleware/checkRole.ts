import {Request, Response, NextFunction} from 'express';

interface RoleRequest extends Request {
    user?: {
        role?: string;
    };
}

export const checkRole = (allowedRoles: string[]) => {
    return (req: RoleRequest, res: Response, next: NextFunction) => {
        const userRole = req.body.role;
        console.log(req.body.role);
        if (!userRole || !allowedRoles.includes(userRole)) {
            console.log(userRole);
            return res.status(403).json({message: 'Access denied'});
        }
        res.send({message:'Access granted'});
        console.log('granted')
        next();
    };
};