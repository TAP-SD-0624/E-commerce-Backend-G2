import {Request, Response, NextFunction} from 'express';
import Users from "../database/models/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const createToken = (id: number) => jwt.sign(
    /* payload */
    {id},
    /* secret */
    process.env.ACCESS_TOKEN_SECRET as string,
    /* options */
    {expiresIn: '3d'});
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    let firstName: string = req.body.firstName.toLowerCase();
    let lastName: string = req.body.lastName.toLowerCase();
    let email: string = req.body.email.toLowerCase();
    let password: string = req.body.password;
    let phone: string = req.body.phone || "123-456-7890";
    let DOB : number = req.body.dob || "01-02-2024";
    let image : string = req.body.image || "https://i.imgur.com/h9m0E58.jpg";


    try {
        // Hash and salt the password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        // Create the user
        const user: Users = await Users.create({firstName, lastName, email, password, phone, DOB, image});

        // create jwt token and send in cookie
        let token: string = createToken(user.id as number);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({user});

    } catch (err) {
        console.error(err);
        res.status(400).json({error: 'An error occurred while creating the user'});
    }
}

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
        token = createToken(user.id as number);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
        res.cookie('userLogin', true, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
        res.status(200).json({user:user.id, token});

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
            return res.status(404).json({ error: 'User not found' });
        }


        res.status(200).json({ user: user.id, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};