import { Sequelize, Model, DataTypes, Transaction, Op } from 'sequelize';
import { createNewUserInterface } from '../utils/interfaces';
import Users from '../database/models/users';

class DbHelper {
    async createUser({ firstName, lastName, email, password, phone, DOB, imageUrl, role }: Users): Promise<Users> {
        // Create the user
        return await Users.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            DOB,
            imageUrl,
            role
        });
    }
}

export const dbHelper = new DbHelper();
