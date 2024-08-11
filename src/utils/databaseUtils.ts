import {db} from "../database";

export async function findUserByEmail(email: string): Promise<null | {}> {
    return await db.Users.findOne({
        where: {email}
    });
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    const results = await findUserByEmail(email);
    return !!results;
}