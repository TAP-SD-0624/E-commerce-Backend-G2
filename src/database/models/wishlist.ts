import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
import Users from './users';

interface WishlistInterface {
    id?: number;
    productId: number;
    userId: number;
    createdAt?: number;
    updatedAt?: number;
}
class Wishlist extends Model<WishlistInterface> implements WishlistInterface {
    declare id?: number;
    declare productId: number;
    declare userId: number;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {
        Wishlist.belongsTo(Products, { foreignKey: 'productId' });
        Wishlist.belongsTo(Users, { foreignKey: 'userId' });
    }
}
Wishlist.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
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
        modelName: 'Wishlist',
        sequelize
    }
);
export default Wishlist;
