import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
import Users from './users';
export interface RatingsInterface {
    id?: number;
    productId: number;
    userId: number;
    rating: number;
    review: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Ratings extends Model<RatingsInterface> implements RatingsInterface {
    declare id?: number;
    declare productId: number;
    declare userId: number;
    declare rating: number;
    declare review: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    static associate() {
        Ratings.belongsTo(Products, { foreignKey: 'productId' });
        Ratings.belongsTo(Users, { foreignKey: 'userId' });
    }
}
Ratings.init(
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.STRING,
            allowNull: true
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
        modelName: 'Ratings',
        sequelize
    }
);
export default Ratings;
