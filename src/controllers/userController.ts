import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import { createNewUser } from '../utils/database';
import { createToken } from '../utils/jwt';
import { createNewUserInterface } from '../utils/interfaces';
// import {createToken} from "../middleware/roleMiddleware";

export const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone, DOB, imageUrl, role }: createNewUserInterface = req.body;
    try {
        const user = await createNewUser(firstName, lastName, email, password);
        const token: string = createToken(user.id as number, user.role);
        return res.status(201).json({ token });
    } catch (err) {
        return res.status(400).json({ error: 'An error occurred while creating the user' });
    }
};
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        // Use LOWER function for case-insensitive comparison
        const user = await Users.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        let token: string = '';
        token = createToken(user.id as number, user.email as string);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.cookie('userLogin', true, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ user: user.id, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user: user.id, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const prohibitedRoute = async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({ message: 'prohibitedRoute' });
    console.log('prohibitedRoute');
};
