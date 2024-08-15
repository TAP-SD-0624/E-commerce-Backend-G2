import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import { createNewUserInterface } from '../utils/interfaces';
import { dbHelper } from '../database/dbHelper';
import { CustomError } from '../middleware/customError';
import { generateToken } from '../utils/tokenUtils';
import { db } from '../database';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, phone, DOB, imageUrl }: createNewUserInterface = req.body;
    try {
        const user: Users = await dbHelper.createUser({
            firstName,
            lastName,
            email,
            password,
            phone,
            DOB,
            imageUrl,
            role: 'user'
        } as Users);
        if (user) {
            const token = generateToken(user.id as number, user.role);
            const { password, role, ...userWithoutSensitiveData } = user;
            res.status(201).json({
                user: userWithoutSensitiveData,
                token,
                message: `User ${firstName} ${lastName} created successfully`,
                status: 201
            });
        } else {
            throw new CustomError('Something went wrong, cannot create user', 422);
        }
    } catch (err) {
        next(err);
    }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        const user = await Users.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new CustomError('User not found', 400);
        }

        if (user.password !== password) {
            throw new CustomError('Invalid password', 422);
        }
        const token = generateToken(user.id as number, user.role);
        res.status(200).json({ message: `User ${user.firstName} ${user.lastName} logged in successfully`, token });
    } catch (err) {
        next(err);
    }
};

export const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { id, firstName, lastName, password, phone, DOB, imageUrl, role }: createNewUserInterface = req.body;
    console.log(userUpdate);

    try {
        // const { id } = req.body; // User ID passed in the request body
        const { decoded } = req.body; // Decoded JWT payload from the middleware

        if (id != decoded.userId) {
            return next(new CustomError('User ID mismatch', 404));
            // return res.status(403).json({ message: 'User ID mismatch' });
        } else {
            const user = await Users.findByPk(id);
            console.log(user);
            //Update the user
            if (user != null) {
                try {
                    console.log(user);

                    user.update({
                        firstName,
                        lastName,
                        password,
                        phone: phone ?? '',
                        DOB: DOB ?? '1999-09-09',
                        imageUrl: imageUrl ?? '',
                        role: role ?? 'user'
                    });
                    res.status(201).json({ user, message: `User ${firstName} ${lastName} updated successfully` });
                } catch (err) {
                    console.error(err);
                    // res.status(400).json({ error: 'An error occurred while updating the user' });
                    return next(new CustomError('An error occurred while updating the user', 422));
                }
            } else {
                return next(new CustomError('An error occurred while updating the user', 422));
            }
        }
    } catch (err) {
        // new CustomError('Data not found', 404, 'DATA_NOT_FOUND');
        // console.error(err);
        // res.status(400).json({ error: 'An error occurred while updating the user' });
        return next(new CustomError('An error occurred while updating the user', 422));
    }
};

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { decoded } = req.body;
    const id = req.query.id as string;
    try {
        if (id != decoded.userId) throw new CustomError('unauthorized', 403);
        const user = await Users.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [db.Cart, db.Address, db.Orders, db.Tranactions, db.Wishlist, db.Ratings]
        });
        if (user) {
            return res.send(user);
        } else {
            throw new CustomError('An error occurred while fetching the user', 422);
        }
    } catch (err) {
        next(err);
    }
};
