import { db } from '../database';
import Users from '../database/models/users';
import { CustomError } from '../middleware/customError';
import { BelongsToManyCreateAssociationMixinOptions } from 'sequelize';
import bcrypt from 'bcrypt';
import { log } from 'console';

export async function findUserByEmail(email: string): Promise<Users> {
    const user = await db.Users.findOne({
        where: { email }
    });
    if (user) {
        return user;
    } else {
        throw new CustomError('User not found', 404);
    }
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    try {
        const results = await findUserByEmail(email);
        return true;
    } catch (error) {
        return false;
    }
}

export async function createUserDB(
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    DOB: number,
    imageUrl: string
) {
    try {
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const result = await db.Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            DOB,
            imageUrl,
            role
        });
        return result;
    } catch (err) {
        throw new CustomError('Error creating User', 500);
    }
}
export async function getUserById(id: number): Promise<Users> {
    const user = await Users.findByPk(id);
    if (user) return user;
    throw new CustomError('User not found', 404);
}
export async function updateUserById(
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    DOB: number,
    imageUrl: string
) {
    try {
        const oldUser = await getUserById(id);
        const hashedPassword = await bcrypt.hash(String(password), 10);

        const user = await db.Users.update(
            {
                firstName: firstName || oldUser.dataValues.firstName,
                lastName: lastName || oldUser.dataValues.lastName,
                password: hashedPassword || oldUser.dataValues.password,
                phone: phone || oldUser.dataValues.phone,
                DOB: DOB || oldUser.dataValues.DOB,
                imageUrl: imageUrl || oldUser.dataValues.imageUrl
            },
            {
                where: { id }
            }
        );
    } catch (error) {
        throw new CustomError('unable to update user profile', 500);
    }
}

export async function getUserProfile(id: number): Promise<Users> {
    const user = await Users.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [db.Cart, db.Address, db.Orders, db.Tranactions, db.Wishlist, db.Ratings]
    });
    if (user) {
        return user;
    } else {
        throw new CustomError('unable to get profile', 404);
    }
}
