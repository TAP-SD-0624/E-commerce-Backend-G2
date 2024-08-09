import { db } from '../database';
import Users from '../database/models/users';
import bcrypt from 'bcrypt';
export async function findUserByEmail(email: string): Promise<null | {}> {
    const results = await db.Users.findOne({
        where: { email }
    });
    return results;
}
export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    const results = await findUserByEmail(email);
    if (results) {
        return true;
    } else {
        return false;
    }
}
export async function createNewUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string = '00970',
    DOB: string = '01-02-2024',
    imageUrl: string = 'https://i.imgur.com/h9m0E58.jpg',
    role: string = 'user'
) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: Users = await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        DOB: Date.parse(DOB),
        imageUrl,
        role
    });
    return user;
}
