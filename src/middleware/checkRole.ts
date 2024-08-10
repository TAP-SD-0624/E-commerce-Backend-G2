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
          res.status(403).json({message: 'Access denied, please check your role, or enter a role'});
        }
        console.log(`Permission granted, welcome ${userRole}!`)
        next();
    };
};