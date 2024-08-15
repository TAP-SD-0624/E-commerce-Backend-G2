import { db } from '../database';
import { CustomError } from '../middleware/customError';

export async function findUserByEmail(email: string): Promise<null | {}> {
    return await db.Users.findOne({
        where: { email }
    });
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    const results = await findUserByEmail(email);
    return !!results;
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
        const result = await db.Users.create({
            firstName,
            lastName,
            email,
            password,
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
