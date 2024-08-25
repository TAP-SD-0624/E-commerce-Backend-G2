import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Address from './address';
import Ratings from './ratings';
import Cart from './cart';
import Orders from './orders';
import Tranactions from './Transactions';
import Wishlist from './wishlist';
export interface UserInterface {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    DOB: number;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
    role: string;
}
class Users extends Model<UserInterface> implements UserInterface {
    declare id?: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare phone: string;
    declare password: string;
    declare DOB: number;
    declare imageUrl: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare role: string;
    static associate() {
        Users.hasMany(Address, { foreignKey: 'userId' });
        Users.hasMany(Ratings, { foreignKey: 'userId' });
        Users.hasMany(Cart, { foreignKey: 'userId' });
        Users.hasMany(Tranactions, { foreignKey: 'userId' });
        Users.hasMany(Orders, { foreignKey: 'userId' });
        Users.hasMany(Wishlist, { foreignKey: 'userId' });
    }
}
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        firstName: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        lastName: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        modelName: 'Users',
        sequelize
    }
);
export default Users;
