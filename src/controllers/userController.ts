import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createNewUserInterface } from '../utils/interfaces';
import { dbHelper } from '../database/dbHelper';
import { CustomError } from '../middleware/customError';

export const createToken = (id: number, role: string) => jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '3d' });

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, phone, DOB, imageUrl, role }: createNewUserInterface = req.body;

    try {
        // Create the user
        const user: Users = await dbHelper.createUser({
            firstName,
            lastName,
            email,
            password,
            phone,
            DOB,
            imageUrl,
            role
        } as Users);
        // const user: Users = await Users.create({
        //     firstName,
        //     lastName,
        //     email, //Email should be unique
        //     password,
        //     phone: phone ?? '',
        //     DOB: DOB ?? '1999-09-09',
        //     imageUrl: imageUrl ?? '',
        //     role
        // });

        // Create JWT token with user role
        const token: string = createToken(user.id as number, user.role);
        res.status(201).json({ user, token, message: `User ${firstName} ${lastName} created successfully` });
    } catch (err) {
        // new CustomError('Data not found', 404, 'DATA_NOT_FOUND');
        console.error(err);
        res.status(400).json({ error: 'An error occurred while creating the user' });
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

        console.log(user);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        let token: string = '';
        token = createToken(user.id as number, user.email as string);
        res.status(200).json({ message: `User ${user.firstName} ${user.lastName} logged in successfully`, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    try {
        const user = await Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `User ${user.firstName} ${user.lastName} logged out successfully` });
        //! remove JWT from database
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const prohibitedRoute = async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({ message: 'prohibited Route granted' });
    console.log('prohibited Route');
};
