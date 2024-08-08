import {Request, Response, NextFunction} from 'express';
import Users from "../database/models/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import {createToken} from "../middleware/roleMiddleware";

export const createToken = (id: number, role: string) => jwt.sign(
    {id, role},
    process.env.ACCESS_TOKEN_SECRET as string,
    {expiresIn: '3d'}
);





export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const firstName: string = req.body.firstName.toLowerCase();
    const lastName: string = req.body.lastName.toLowerCase();
    const email: string = req.body.email.toLowerCase();
    const password: string = req.body.password;
    const phone: string = req.body.phone;
    const DOB: number = req.body.dob || "01-02-2024";
    const imageUrl: string = req.body.imageUrl || "https://i.imgur.com/h9m0E58.jpg";
    const role: string = req.body.role || "user";

    try {
        // Hash and salt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user: Users = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            DOB,
            imageUrl,
            role
        });

        // Create JWT token with user role
        const token: string = createToken(user.id as number, user.role);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({user, token});

    } catch (err) {
        console.error(err);
        res.status(400).json({error: 'An error occurred while creating the user'});
    }
};
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body as { email: string; password: string };

    try {
        // Use LOWER function for case-insensitive comparison
        const user = await Users.findOne({
            where: {
                email
            }
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }

        if (user.password !== password) {
            return res.status(400).json({error: 'Invalid password'});
        }
        let token: string = '';
        token = createToken(user.id as number, user.email as string);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
        res.cookie('userLogin', true, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
        res.status(200).json({user: user.id, token});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }


        res.status(200).json({user: user.id, message: 'User logged out successfully'});
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const prohibitedRoute = async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({message:"prohibitedRoute"});
    console.log('prohibitedRoute');
}