import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    login?: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id?: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public login?: boolean;
}

User.init({
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: 'user',
});

export default User;
