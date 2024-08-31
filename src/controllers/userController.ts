import { Request, Response, NextFunction } from 'express';
import { createNewUserInterface } from '../utils/interfaces';
import { CustomError } from '../middleware/customError';
import { generateToken } from '../utils/tokenUtils';
import { createUserDB, findUserByEmail, getUserProfile, updateUserById } from '../utils/UsersUtils';
import bcrypt from 'bcrypt';

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createNewUserInterface'
 *     responses:
 *       201:
 *         description: User created successfully
 *       422:
 *         description: Validation Error
 *       500:
 *         description: something went wrong
 */
export const createUser = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, phone, DOB, imageUrl }: createNewUserInterface = req.body;
        try {
            const user = await createUserDB(role, firstName, lastName, email, password, phone, DOB, imageUrl);
            if (user) {
                const token = generateToken(user.dataValues.id as number, user.dataValues.role);
                const { password, role, ...userWithoutSensitiveData } = user.dataValues;
                return res.status(201).json({
                    user: userWithoutSensitiveData,
                    token
                });
            } else {
                throw new CustomError('Something went wrong, cannot create user', 422);
            }
        } catch (err) {
            next(err);
        }
    };
};

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createNewUserInterface'
 *     responses:
 *       201:
 *         description: user logged in succesfully
 *       401:
 *         description: Invalid password
 *       500:
 *         description: something went wrong
 */

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        const user = await findUserByEmail(email);
        const verPass = await bcrypt.compare(String(password), `${user.dataValues.password.trim()}`);
        if (verPass) {
            const token = generateToken(user.dataValues.id!, user.dataValues.role);
            const { password, role, ...userWithoutSensitiveData } = user.dataValues;
            return res.status(201).json({
                user: userWithoutSensitiveData,
                token
            });
        } else {
            throw new CustomError('Invalid credentials, try again', 401);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: update user data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createNewUserInterface'
 *     responses:
 *       201:
 *         description: user logged in succesfully
 *       422:
 *         description: Invalid input
 *       500:
 *         description: something went wrong
 */
export const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, password, phone, DOB, imageUrl }: createNewUserInterface = req.body;
    try {
        const user = await updateUserById(req.body.decoded.userId, firstName, lastName, password, phone, DOB, imageUrl);
        return res.status(201).json({
            message: 'User updated succesfullly'
        });
    } catch (err) {
        return next(err);
    }
};

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: No token provided
 *       404:
 *         description: can not find this user data
 *       500:
 *         description: something went wrong
 */

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserProfile(req.body.decoded.userId);
        return res.send(user);
    } catch (err) {
        next(err);
    }
};
